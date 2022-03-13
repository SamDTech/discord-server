import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import mongoose from "mongoose";
import { AuthRouter } from "./routes/authRoute";
import errorMiddleware from "./middlewares/errorHandler";

dotenv.config();
colors.enable();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB".underline.yellow.bold);
  })
  .catch((err) => {
    console.log(err.red.bold.underline);
  });

  // routes
  app.use('/api/auth', AuthRouter)

const server = http.createServer(app);


// set global error handler
app.use(errorMiddleware)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.underline.cyan.bold);
});
