import { asyncHandler, asyncHandlerTry } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudiner } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { Subcription } from "../models/subcription.model.js";
import mongoose from "mongoose";


// generate AccessToken and RefreshToken fuction
const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        user.refreshToken = refreshToken
  
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}
// user registration fuction
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  // console.log(fullName, email, username, password);

  if (!fullName) {
    throw new ApiError(400, "fullName is required");
  }
  if (!email || !email.endsWith("@gmail.com")) {
    throw new ApiError(400, "valid email is required");
  }
  if (!username) {
    throw new ApiError(400, "username is required");
  }
  if (!password || password.length < 6) {
    throw new ApiError(400, "password is required with at least 6 characters");
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(409, " user already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required");
  }

  const avatar = await uploadOnCloudiner(avatarLocalPath);

  if (!avatar || !avatar.url) {
    console.error("Avatar upload failed:", avatar && avatar.error ? avatar.error : "Unknown error");
    throw new ApiError(400, "Avatar upload failed. Please try again.");
  } else {
    console.log("Avatar uploaded successfully:", avatar.url);
  }

  let coverImage = null;
  if (req.files && req.files.coverImage) {
    const coverImageLocalPath = req.files.coverImage[0]?.path;
    if (coverImageLocalPath) {
      coverImage = await uploadOnCloudiner(coverImageLocalPath);
      if (!coverImage || !coverImage.url) {
        console.error("Cover Image upload failed:", coverImage && coverImage.error ? coverImage.error : "Unknown error");
        throw new ApiError(400, "Cover Image upload failed. Please try again.");
      } else {
        console.log("Cover Image uploaded successfully:", coverImage.url);
      }
    }
  }

  const user = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage ? coverImage.url : null,
  });

  if (!user) {
    throw new ApiError(500, "something went wrong while registering the user");
  }

  await res.status(201).json(new ApiResponse(201, user, "User registered successfully"));
});

// login fuction
const loginUser = asyncHandler(async (req, res) =>{
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const {email, username, password} = req.body

  if (!username && !email) {
      throw new ApiError(400, "username or email is required")
  }
  
  // Here is an alternative of above code based on logic discussed in video:
  // if (!(username || email)) {
  //     throw new ApiError(400, "username or email is required")
      
  // }

  const user = await User.findOne({
      $or: [{username}, {email}]
  })

  if (!user) {
      throw new ApiError(404, "User does not exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials")
  }

  // Generate access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
          new ApiResponse(
              200, 
              {
                  user: loggedInUser, accessToken, refreshToken
              },
              "User logged In Successfully"
          )
      );
});

// logout function
const logoutUser = asyncHandler(async(req, res)=>{
  await User.findByIdAndUpdate(
    req.user._id,
    {
        $unset:{
            refreshToken:1
        }
    },{
        new:true,
    }
   
   )

   const options = {
    httpOnly: true,
    secure: true
}

   
  return res
  .status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(new ApiResponse(200,{},"User logged out successfully"))

   
})

// refress acess tooken

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  console.log(incomingRefreshToken)

  if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request")
  }
     
  try {
      const decodedToken = jwt.verify(
          incomingRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
      )
  
      const user = await User.findById(decodedToken?._id)
  
      if (!user) {
          throw new ApiError(401, "Invalid refresh token")
      }
  
      if (incomingRefreshToken !== user?.refreshToken) {
          throw new ApiError(401, "Refresh token is expired or used")
          
      }
  
      const options = {
          httpOnly: true,
          secure: true
      }
  
      const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
  
      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
          new ApiResponse(
              200, 
              {accessToken, refreshToken: newRefreshToken},
              "Access token refreshed"
          )
      )
  } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token")
  }

})

// changeCurrentpassword change

const changeCurrentPassword = asyncHandler(async(req,res) => {
  const { oldPassword, newPassword,confPassword } =req.body

  if(newPassword !==confPassword ){
    throw new ApiError(400, "New password and confirm password does not match")
  }

  const user = await User.findById(req.user?._id)
  const isPasswordValid = await user.isPasswordCorrect(oldPassword)

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid old password")
  }

  user.password = newPassword
  await user.save({validateBeforeSave: false})

  return res
 .status(200)
 .json(new ApiResponse(200,{},"Password changed successfully"))

})

// getCurrentUser

const getCurrentUser = asyncHandler(async(req,res) => {
  return res
 .status(200)
 .json(new ApiResponse(200,req.user, "User fetched successfully"))

})

// updateAccountDeatails

const updateAccountDetails = asyncHandler(async(req,res) => {
  
  const {fullName, email} = req.body

  if(!(fullName||email)) {
    throw new ApiError(400, "fullName or email is required")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
   {
     $set:{
       fullName,
       email
     }

   },
  {new:true}
).select("-password")

return res
.status(200)
 .json(new ApiResponse(200,user, "Account details updated successfully"))

})

// update avatar

const updateAvatar = asyncHandler(async(req,res) => {
  const avatarLocalPath = req.file?.path

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is missing")
  }

  const avatar = await uploadOnCloudiner(avatarLocalPath)
  if (!avatar.url) {
    throw new ApiError(400, "Avatar upload failed . Please try again.")
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
   {
     $set:{
       avatar: avatar.url
     }
  },

  {new:true}
).select("-password")

return res
.status(200)
.json(
  new ApiResponse(200,user, "Avatar updated successfully")
)

})

// update userCover image
const updateCoverImage = asyncHandler(async(req,res) => {
  const coverImageLocalPath = req.file?.path

  if (!coverImageLocalPath) {
    throw new ApiError(400, "cover image file is missing")
  }

  const coverImage = await uploadOnCloudiner(coverImageLocalPath)
  if (!coverImage.url) {
    throw new ApiError(400, "cover image upload failed . Please try again.")
  }
   const user = await User.findByIdAndUpdate(
    req.user?._id,
   {
     $set:{
      coverImage: coverImage.url
     }
  },

  {new:true}
).select("-password")

return res
.status(200)
.json(
  new ApiResponse(200,user, "Avatar updated successfully")
)
})

// get user channel
const getUserChannelProfile = asyncHandler(async(req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
      throw new ApiError(400, "Username is missing");
  }

  const channel = await User.aggregate([
      {
          $match: { username: username?.toLowerCase() }
      },
      {
          $lookup: {
              from: "Subcriptions",
              localField: "_id",
              foreignField: "channel",
              as: "subscribers"
          }
      },
      {
          $lookup: {
              from: "Subcriptions",
              localField: "_id",
              foreignField: "subscribers",
              as: "subscribedTO"
          }
      },
      {
          $addFields: {
              SubcriberCount: { $size: "$subscribers" },
              channelSubscribedTOCount: { $size: "$subscribedTO" },
              isSubscribed: {
                  $in: [req.user?._id, "$subscribers.subscriber"]
              }
          }
      },
      {
          $project: {
              fullName: 1,
              username: 1,
              email: 1,
              avatar: 1,
              coverImage: 1,
              isSubscribed: 1,
              SubcriberCount: 1,
              channelSubscribedTOCount: 1,
              createAt: 1
          }
      }
  ]);

  if (!channel?.length) {
      throw new ApiError(404, "Channel doesn't exist");
  }

  // Update SubcriberCount with channelSubscribedTOCount
  if (channel[0].channelSubscribedTOCount) {
      channel[0].SubcriberCount = channel[0].channelSubscribedTOCount;
  }

  return res.status(200).json(
      new ApiResponse(200, channel[0], "Channel fetched successfully")
  );
});


// get user videos watch history 
const getWatchHistory = asyncHandler(async(req, res) =>{
      const user = await User.aggregate([
        {
          $match:{
            _id: new mongoose.Types.ObjectId(req.user._id)
          }
        },
        {
          $lookup:{
            from:"videos",
            localField:"watchHistory",
            foreignField:"_id",
            as:"watchHistory",
            pipeline:[
              {
                $lookup:{
                  from:"users",
                  localField:"owner",
                  foreignField:"_id",
                  as:"owner",
                  pipeline:[
                    {
                      $project:{
                        fullName:1,
                        username:1,
                        avatar:1,
                        
                      }
                    }
                  ]
                  
                }
              },
              {
                $addFields:{
                  first:"$owner"
                }
              }
            ]
          }
        }

      ])

      return res
      .status(200)
      .json(
         new ApiResponse(200,user[0], "Watch History fetched successfully"))
})



export {
   registerUser,
   loginUser,
   logoutUser,
   refreshAccessToken,
   changeCurrentPassword ,
   getCurrentUser,
   updateAccountDetails,
   updateAvatar,
   updateCoverImage,
   getUserChannelProfile,
   getWatchHistory
   };
