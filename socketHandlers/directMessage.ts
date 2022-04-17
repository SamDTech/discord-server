export const directMessageHandler = async (socket: any, data: any) => {
  try {
    console.log(socket);
    const { userId } = socket;

    const { receiverUserId, message } = data;
  } catch (error) {}
};
