import { Router, Request, Response } from "express";
import { login, register } from "../controllers/authController";
import * as Joi from "joi";
import { createValidator } from "express-joi-validation";

const validator = createValidator({});

const router = Router();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  username: Joi.string().min(3).max(12).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

router.post("/register", validator.body(registerSchema, {}), register);

router.post("/login", validator.body(loginSchema), login);

export { router as AuthRouter };
