import { Router } from 'express';
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subcription.control.js"
import {verifyJWT} from "../middlewears/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/c/:channelId")
    .get(getUserChannelSubscribers)
    .post(toggleSubscription);

router.route("/u/:subscriberId").get(getSubscribedChannels);

export default router