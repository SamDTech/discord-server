import { NextFunction, Request, Response } from "express";

import asyncHandler from "express-async-handler";
import FriendInvitation from "../models/friendInvitationModel";
import User from "../models/userModel";
import AppError from "../utils/appError";

export const postInvite = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    // get logged in user
    const user = req.user!;

    if (user.email.toLowerCase() === email.toLowerCase()) {
      return next(new AppError(409, "You can't invite yourself"));
    }

    //find the user by email
    const targetFriend = await User.findOne({ email });

    if (!targetFriend) {
      return next(
        new AppError(
          404,
          `Friend of ${email} has not been found. Please check email`
        )
      );
    }

    // check if invitation has already been sent
    const invitationAlreadyReceived = await FriendInvitation.findOne({
      senderId: user._id,
      receiverId: targetFriend._id,
    });

    if (invitationAlreadyReceived) {
      return next(new AppError(409, "Invitation already sent"));
    }

    //check if the user is already a friend
    const isAlreadyFriend = targetFriend.friends.find(
      (friendId: string) => friendId.toString() === user._id.toString()
    );

    if (isAlreadyFriend) {
      return next(
        new AppError(
          409,
          "You are already friends. Please check your friends list"
        )
      );
    }

    // create a new invitation
    const newInvitation = await FriendInvitation.create({
      senderId: user._id,
      receiverId: targetFriend._id,
    });

    res.status(201).send("Invitation sent");
  }
);
