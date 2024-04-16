import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        console.log("Cookies:", req.cookies);
        console.log("Authorization Header:", req.headers.authorization);

        let token = "j%3A%7B%7D"

        console.log("Token:", token);
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        if (error instanceof jwt.TokenExpiredError) {
            throw new ApiError(401, "Access token expired");
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError(401, "Malformed or invalid access token");
        } else {
            throw new ApiError(401, "Invalid access token");
        }
    }
});
