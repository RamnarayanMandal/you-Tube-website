import { Router } from "express";
import { addWatchHistory, changeCurrentPassword, getCurrentUser, getUserById, getUserChannelProfile, getWatchHistory, loginUser, logoutUser,refreshAccessToken,  registerUser, updateAccountDetails, updateAvatar, updateCoverImage } from "../controllers/user.controller.js";
import {upload} from '../middlewears/multer.middlewear.js'
import {verifyJWT}  from "../middlewears/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser)

router.route("/login").post(loginUser)


router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateCoverImage)


// secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-tooke").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)
router.route("/:userId").get(verifyJWT, getUserById)
router.route("/:videoId").patch(verifyJWT, addWatchHistory)

export default router;