import { getSocketServerInstance } from "./../../serverStore";
import asyncHandler from "express-async-handler";
import FriendInvitation from "../../models/friendInvitationModel";
import { getOnlineUsers } from "../../serverStore";

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
