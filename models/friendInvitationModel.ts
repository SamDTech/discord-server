import mongoose from "mongoose";

const friendInvitation = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   lowercase: true,
    // },
  },
  {
    timestamps: true,
  }
);

const FriendInvitation = mongoose.model("FriendInvitation", friendInvitation);

export default FriendInvitation;
