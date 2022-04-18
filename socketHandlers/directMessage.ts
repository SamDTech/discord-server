import Conversation from "../models/ConversationModel";
import Message from "../models/messageModel";
import { updateChatHistory } from "./updates/chat";

export const directMessageHandler = async (socket: any, data: any) => {
  try {
    const { user } = socket;

    const { receiverUserId, content } = data;

    // create a new message
    const newMessage = await Message.create({
      content: content,
      authorId: user.id,
      date: new Date(),
      type: "DIRECT",
    });

    // find if conversation exist between this two users, if not, create a new conversation
    const conversation = await Conversation.findOne({
      participants: {
        $all: [user.id, receiverUserId],
      },
    });
    if (!conversation) {
      const newConversation = await Conversation.create({
        participants: [user.id, receiverUserId],
        messages: [newMessage._id],
      });

      // perform and update sender and receiver if online
      updateChatHistory(newConversation._id.toString());

      return;
    } else {
      // if conversation exist, add the new message to the conversation
      await Conversation.updateOne(
        { _id: conversation._id },
        { $push: { messages: newMessage._id } }
      );

      // perform and update sender and receiver if online
      updateChatHistory(conversation._id.toString());
    }
  } catch (error) {}
};
