import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req,res){
    try{
        const currentUserId = req.user._id; // get current user id from request object
        const currentUser = req.user; // get current user from request object

        const recommondedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } }, // exclude current user
                {$id: { $nin: currentUser.friends } }, // exclude friends of current user
                { isOnboarded: true }, // only include users who have completed onboarding
            ]
        })

        res.status(200).json({
            recommondedUsers // todo to change later
        });
    }catch(error){
        console.log("Error in getRecommendedUsers", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
} 

export async function getMyFriends(req,res) {
    try{
        const user = await User.findById(req.user._id)
        .select("friends") // only select friends field
        .populate("friends", "fullName profilePic nativeLanguage learningLanguage"); // populate friends with fullName and 
        
        res.status(200).json({
            friends: user.friends // return friends array
        });

    }catch(error){
        console.log("Error in getMyFriends controller", error.message);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function sendFriendRequest(req,res) {
       try{
        const myId = req.user._id; // get current user id from request object
        const {id:recipientId} = req.params; // get recipient id from request params

        //prevent sending friend request to self
        if(myId === recipientId){
            return res.status(400).json({
                message: "You cannot send friend request to yourself"
            });
        }
        //check if recipient exists
        const recipient = await User.findById(recipientId);
        if(!recipient){
            return res.status(404).json({
                message: "Recipient not found"
            });
        }

        //check if recipient is already a friend
        const isAlreadyFriend = recipient.friends.includes(myId);
        if(isAlreadyFriend){
            return res.status(400).json({
                message: "You are already friends with this user"
            });
        }

        //check if a friend request already exists between the two users
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ]
        });
        if(existingRequest){
            return res.status(400).json({
                message: "Friend request already exists"
            });
        }

        //create a new friend request
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        });
        //send response 
        res.status(201).json({
            message: "Friend request sent successfully",
            friendRequest: friendRequest // return the created friend request
        });

       }catch(error){
           console.log("Error in sendFriendRequest controller", error.message);
           return res.status(500).json({
               message: "Internal server error"
           });
       }
}

export async function acceptFriendRequest(req, res) {
    try{
        const {id:requestId} = req.params; // get request id from request params

        const friendRequest = await FriendRequest.findById(requestId);
        if(!friendRequest){
            return res.status(404).json({
                message: "Friend request not found"
            });
        }

        // check if the current user is the recipient of the friend request
        if(friendRequest.recipient.toString() !== req.user._id){
            return res.status(403).json({
                message: "You are not authorized to accept this friend request"
            });
        }

        friendRequest.status = "accepted"; // update the status of the friend request
        await friendRequest.save(); // save the updated friend request

        // add the recipient to the sender's friends list
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient } // add recipient to sender's friends list
        });

        // add the sender to the recipient's friends list   
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender } // add sender to recipient's friends list
        });

        res.status(200).json({
            message: "Friend request accepted successfully",
        });
    }catch(error){
        console.log("Error in acceptFriendRequest controller", error.message);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}