const connectedUsers = new Map();

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
