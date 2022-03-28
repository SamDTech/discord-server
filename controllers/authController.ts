import * as bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import AppError from "../utils/appError";
import jwt from "jsonwebtoken";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password } = req.body;

    // check if user exist
    const user = await User.findOne({ email });

    if (user) {
      return next(new AppError(409, "User already exist"));
    }

    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id, email }, process.env.JWT_SECRET!,{
      expiresIn: "1d",
    });

    res.status(201).json({
      status: "success",
      username: newUser.username,
      email: newUser.email,
      token
    });
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;

    console.log(req.body);
    

    // find the user
    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError(404, "Invalid credentials"));
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new AppError(401, "Invalid credentials"));
    }

    // generate token
     const token = jwt.sign(
       { id: user._id, email },
       process.env.JWT_SECRET!,
       {
         expiresIn: "1d",
       }
     );

    res.status(200).json({
      status: "success",
      username: user.username,
      email: user.email,
      token,
    });
  }
);
