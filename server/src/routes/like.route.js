import { Router } from 'express';
import {
    getLikedVideos,
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike,
    toggleCommentDisLike,
    toggleTweetDisLike,
    toggleVideoDisLike,
    getLikeVidees,
} from "../controllers/like.controller.js"
import { verifyJWT } from "../middlewears/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/toggle/v/:videoId").post(toggleVideoLike);
router.route("/dislike/toggle/v/:videoId").post(toggleVideoDisLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/dislike/toggle/c/:commentId").post(toggleCommentDisLike);
router.route("/toggle/t/:tweetId").post(toggleTweetLike);
router.route("/dislike/toggle/t/:tweetId").post(toggleTweetDisLike);
router.route("/:likeBy").get(getLikedVideos);
router.route("/video/:videoId").get(getLikeVidees);

export default router;
