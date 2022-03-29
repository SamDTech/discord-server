import { addNewConnectedUser } from "./../serverStore";
export const newConnectionHandler = async (socket: any, io: any) => {
    console.log(socket.user);

  const { id } = socket.user;

  console.log(id);

  console.log("socket id", socket.id);
  


  addNewConnectedUser(socket.id, id);
};
