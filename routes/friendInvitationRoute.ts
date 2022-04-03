import { verifyToken } from "./../middlewares/authMiddleware";
import { Router, Request, Response } from "express";
import { login, register } from "../controllers/authController";
import * as Joi from "joi";
import { createValidator } from "express-joi-validation";
import { inviteAccept, inviteReject, postInvite } from "../controllers/friendInvitationController";

const validator = createValidator({});

const router = Router();

const postInvitationSchema = Joi.object({
  email: Joi.string().email().required(),
});

const inviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
});

router.post(
  "/invite",
  verifyToken,
  validator.body(postInvitationSchema),
  postInvite
);

router.post(
  "/accept",
  verifyToken,
  validator.body(inviteDecisionSchema),
  inviteAccept
);

router.post(
  "/reject",
  verifyToken,
  validator.body(inviteDecisionSchema),
  inviteReject
);

export { router as FriendInvitationRouter };
