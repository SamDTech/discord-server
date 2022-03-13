import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";
import User from "../models/userModel";
const { promisify } = require("util");

export const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Getting token and check if its there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new AppError(401, "You are not logged In! Please login to get access")
      );
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) check if user still exist
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError(
          401,
          "the user belonging to the token does no longer exist"
        )
      );
    }

    // GRANT ACCESS TO THE PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  }
);
