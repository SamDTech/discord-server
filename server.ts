import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import morgan from "morgan";
import mongoose from "mongoose";
import { AuthRouter } from "./routes/authRoute";
import errorMiddleware from "./middlewares/errorHandler";
import registerSocketServer from "./socketServer";
import { FriendInvitationRouter } from "./routes/friendInvitationRoute";

dotenv.config();
colors.enable();

const allowedOrigins = ["http://localhost:3000", "http://localhost:5000"];
const options: cors.CorsOptions = {
  credentials: true,
  origin: allowedOrigins,
};

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  cors(options),
);
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB".underline.yellow.bold);
  })
  .catch((err) => {
    console.log(err.red.bold.underline);
  });

const server = http.createServer(app);

registerSocketServer(server);

// routes
app.use("/api/auth", AuthRouter);
app.use("/api/friendInvitation", FriendInvitationRouter);
// set global error handler
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.underline.cyan.bold);
});
