import Conversation from "../models/ConversationModel";
import Message from "../models/messageModel";

export const directMessageHandler = async (socket: any, data: any) => {
  try {
    console.log(socket);
    const { userId } = socket;

    const { receiverUserId, message } = data;

    // create a new message
    const newMessage = await Message.create({
      content: message,
      authorId: userId,
      date: new Date(),
      type: "DIRECT",
    });

    // find if conversation exist between this two users, if not, create a new conversation
    const conversation = await Conversation.findOne({
      participants: {
        $all: [userId, receiverUserId],
      },
    });
    if (!conversation) {
      const newConversation = await Conversation.create({
        participants: [userId, receiverUserId],
        messages: [newMessage._id],
      });

      // perform and update sender and receiver if online
      socket.emit("directMessage", {
        conversationId: newConversation._id,
        message: newMessage,
      });

      return;
    }else{
      // if conversation exist, add the new message to the conversation
      await Conversation.updateOne(
        { _id: conversation._id },
        { $push: { messages: newMessage._id } }
      );

      // perform and update sender and receiver if online
      socket.emit("directMessage", {
        conversationId: conversation._id,
        message: newMessage,
      });
    }
  } catch (error) {}
};
