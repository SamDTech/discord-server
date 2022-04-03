import { NextFunction, Request, Response } from "express";

import asyncHandler from "express-async-handler";

export const postInvite = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    console.log(email);

    res.send("api is working");
  }
);
