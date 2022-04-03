import { addNewConnectedUser } from "./../serverStore";
import { updateFriendsPendingInvitation } from "./updates/friends";

export const newConnectionHandler = async (socket: any, io: any) => {
  console.log(socket.user);

  const { id } = socket.user;

  addNewConnectedUser(socket.id, id);

  // update pending friend list
  updateFriendsPendingInvitation(id);
};
