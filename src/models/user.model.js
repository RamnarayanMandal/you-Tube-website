import mongoose,{Schema} from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcrypt  from "bcrypt";

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:[true, 'password is required'],
            unique:true,
            lowercase:true,
            trim:true,
            index:true,
        },
        email:{
            type:String,
            required:[true, 'password is required'],
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:[true, 'password is required'],
            trim:true,
            index:true,
        },
        avatar:{
            type:String, // cloudinary url
            required:[true, 'password is required'],
            trim:true,
        },
        coverImg:{
            type:String, // cloudinary url
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:'Video'
            }
        ],
        password:{
            type:String,
            required:[true, 'password is required']
           
        }

    }
    ,{timestamps:true});

userSchema.pre("save", async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10)
        next()
    }
    else{
       return next()
    }
    
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAcessToken = async function(){
    const token = jsonwebtoken.sign(
        {_id:this._id,
        username:this.username,
        email:this.email,
        fullName:this.fullName,
        },
        process.env.ACCESS_TOKEN_SCERET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    return token
}
userSchema.methods.generateRefreshToken = async function(){
    const token = jsonwebtoken.sign(
        {_id:this._id },
        process.env.REFERESH_TOKEN_SCERET,
        {
          expiresIn: process.env.REFERESH_TOKEN_EXPIRY
        }
    )
    return token
}

export const User = mongoose.model('User',userSchema);