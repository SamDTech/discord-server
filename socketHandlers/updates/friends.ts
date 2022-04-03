import { getSocketServerInstance } from "./../../serverStore";
import asyncHandler from "express-async-handler";
import FriendInvitation from "../../models/friendInvitationModel";
import { getOnlineUsers } from "../../serverStore";
import User from "../../models/userModel";

export const updateFriendsPendingInvitation = async (userId: string) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "username email");

    // find if user is logged in
    const onlineUsers = getOnlineUsers(userId);

    // emit the events to other users
    const io = getSocketServerInstance();

    onlineUsers.forEach((socketId: string) => {
      io.to(socketId).emit("friendsInvitations", {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateFriends = async (userId: string) => {
  try {
    // find if user is logged in
    const onlineUsers = getOnlineUsers(userId);

    if(onlineUsers.length > 0) {
         const user = await User.findById(userId, { friends: 1 }).populate(
           "friends",
           "username email"
         );

         const friendList = user.friends.map((friend: any) => {
           return {
             id: friend._id,
             username: friend.username,
             email: friend.email,
           };
         });

         // emit the events to other users
         const io = getSocketServerInstance();

         onlineUsers.forEach((socketId: string) => {
           io.to(socketId).emit("friendsList", {
             friends: friendList ? friendList : [],
           });
         });
    }

  } catch (error) {
    console.log(error);
  }
};
