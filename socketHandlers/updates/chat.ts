import { getOnlineUser, getSocketServerInstance } from "./../../serverStore";
import Conversation from "../../models/ConversationModel";

export const updateChatHistory = async (
  conversationId: string,
  toSpecifiedSockedId: string | null = null
) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: "messages",
    model: "Message",
    populate: {
      path: "authorId",
      model: "User",
      select: "username",
    },
  });

  if (conversation) {
    const io = getSocketServerInstance();

    if (toSpecifiedSockedId) {
      // initial update of chat history
      return io.to(toSpecifiedSockedId).emit("directChatHistory", {
          messages: conversation.messages,
          participants: conversation.participants,
      });
    }

    // check if users of this conversation are online
    //if yes emit to them update of messages
    conversation.participants.forEach((userId: string) => {
      const activeConnections = getOnlineUser(userId.toString());

      activeConnections.forEach((socketId: string) => {
        io.to(socketId).emit("directChatHistory", {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};
