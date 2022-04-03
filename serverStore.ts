const connectedUsers = new Map();

let io: any = null;

export const setSocketServerInstance = (ioInstance: any) => {
  io = ioInstance;
};

export const getSocketServerInstance = () => {
  return io;
};

export const addNewConnectedUser = (socketId: string, userId: string) => {
  connectedUsers.set(socketId, { userId });

  console.log(`connectedUsers: ${connectedUsers}`);
};

export const removeConnectedUser = (socketId: string) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log("new connected users");

    console.log(`connectedUsers: ${connectedUsers}`);
  }
};

export const getOnlineUsers = (userId: string) => {
  const onlineUsers: any = [];

  connectedUsers.forEach((user, key) => {
    if (user.userId === userId) {
      onlineUsers.push(key);
    }
  });

  return onlineUsers;
};
