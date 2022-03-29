import { removeConnectedUser } from "../serverStore";

export const disconnetHander = (socket: any) => {
  removeConnectedUser(socket.id);
};
