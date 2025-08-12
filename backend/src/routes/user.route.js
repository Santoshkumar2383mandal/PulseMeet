import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {
     getRecommendedUsers, 
     getMyFriends, 
     sendFriendRequest ,
     acceptFriendRequest,
     getFriendRequests,
     getOutgoingFriendRquests
    } from '../controllers/user.controller.js';

const router = express.Router();

//apply auth middleware to all routes
router.use(protectRoute);

router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);

router.post("/friend-request/:id",sendFriendRequest);
// Accept a friend request using the request ID of put method
router.put("/friend-request/:id/accept",acceptFriendRequest);

router.get("/friend-requests",getFriendRequests);
router.get("/outgoing-friend-requests",getOutgoingFriendRquests);

export default router;