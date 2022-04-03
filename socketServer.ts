import { verifyTokenSocket } from "./middlewares/authSocket";
import { NextFunction } from "express";
import http from "http";
import { newConnectionHandler } from "./socketHandlers/newConnectionHandler";
import { disconnetHander } from "./socketHandlers/disconnectHandler";
import { getCurrentOnlineUsers, setSocketServerInstance } from "./serverStore";

const registerSocketServer = (server: http.Server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  // set socket server instance
  setSocketServerInstance(io);

  // middleware to verify token
  io.use((socket: any, next: NextFunction) => {
    verifyTokenSocket(socket, next);
  });

  // emit online Users
  const emitOnlineUsers = () => {
    io.emit("onlineUsers", {
      onlineUsers: getCurrentOnlineUsers(),
    });
  };

  io.on("connection", (socket: any) => {
    console.log("User connected");
    console.log(socket.id);

    newConnectionHandler(socket, io);
    // emit online users
    emitOnlineUsers();

    socket.on("disconnect", () => {
      console.log("User disconnected");
      disconnetHander(socket);
    });
  });

  setInterval(emitOnlineUsers, 8000);
};

export default registerSocketServer;
