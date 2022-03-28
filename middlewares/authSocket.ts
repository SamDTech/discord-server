import jwt from "jsonwebtoken";
const { promisify } = require("util");

export const verifyTokenSocket = async (socket: any, next: any) => {
  const { token } = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
