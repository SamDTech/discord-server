import { updateChatHistory } from './updates/chat';
import Conversation from "../models/ConversationModel";
import Message from "../models/messageModel";

export const directChatHistoryHandler = async (
  socket: any,
  data: { receiverUserId: string }
) => {
  try {
    const { user } = socket;

    const { receiverUserId } = data;

    // find if conversation exist between this two users, if not, create a new conversation
    const conversation = await Conversation.findOne({
      participants: {
        $all: [user.id, receiverUserId],
      },
      type: "DIRECT",
    });

    if (!conversation) {
      return;
    } else {
      // if conversation exist, Update chat history
      updateChatHistory(conversation._id.toString(), socket.id);

    }
  } catch (error) {
      console.log(error);

  }
};
