import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const register = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
      res.send('register route')
  }
);


export const login = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    res.send("register route");
  }
);