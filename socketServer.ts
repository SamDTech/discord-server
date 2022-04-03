import { verifyTokenSocket } from "./middlewares/authSocket";
import { NextFunction } from "express";
import http from "http";
import { newConnectionHandler } from "./socketHandlers/newConnectionHandler";
import { disconnetHander } from "./socketHandlers/disconnectHandler";

const registerSocketServer = (server: http.Server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  // middleware to verify token
  io.use((socket: any, next: NextFunction) => {
    verifyTokenSocket(socket, next);
  });

  io.on("connection", (socket: any) => {
    console.log("User connected");
    console.log(socket.id);

    newConnectionHandler(socket, io);

    socket.on("disconnect", () => {
      console.log("User disconnected");
      disconnetHander(socket);
    });
  });
};

export default registerSocketServer;
