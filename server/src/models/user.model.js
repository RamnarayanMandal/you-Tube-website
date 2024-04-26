import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
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
        coverImage:{
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
           
        },
        refreshToken:{
            type:String,

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

userSchema.methods.generateAccessToken = async function() {
    const accessToken = await jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
    return accessToken;
};

userSchema.methods.generateRefreshToken = async function() {
    const refreshToken = await jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
   
    return refreshToken;
};


export const User = mongoose.model('User',userSchema);