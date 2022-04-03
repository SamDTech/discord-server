import { verifyToken } from "./../middlewares/authMiddleware";
import { Router, Request, Response } from "express";
import { login, register } from "../controllers/authController";
import * as Joi from "joi";
import { createValidator } from "express-joi-validation";
import { postInvite } from "../controllers/friendInvitationController";

const validator = createValidator({});

const router = Router();

const postInvitationSchema = Joi.object({
  email: Joi.string().email().required(),
});

router.post(
  "/invite",
  verifyToken,
  validator.body(postInvitationSchema),
  postInvite
);

export { router as FriendInvitationRouter };
