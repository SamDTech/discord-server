import { verifyTokenSocket } from './middlewares/authSocket';
import { NextFunction } from "express";
import http from "http";

const registerSocketServer = (server: http.Server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    },
  });

  io.use((socket: any, next: NextFunction) => {
   verifyTokenSocket(socket, next);
  });

  io.on("connection", (socket: any) => {
    console.log("User connected");
    console.log(socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

export default registerSocketServer;
