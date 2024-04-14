import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudiner } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

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
    throw new ApiError(409, "this user already exists");
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

export { registerUser };
