import { Router, Request, Response } from "express";
import { register } from "../controllers/authController";
import * as Joi from "joi";
import { createValidator } from "express-joi-validation";

const validator = createValidator({ passError: true });

const router = Router();

const registerSchema = Joi.object({
  email: Joi.string().email().required().error(new Error('Was REALLY expecting a string')),
  password: Joi.string().min(6).max(20).required().error(new Error('Was REALLY expecting a string')),
  username: Joi.string().min(3).max(12).required().error(new Error('Was REALLY expecting a string')),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

router.post("/register", validator.body(registerSchema, {}), register);

router.post("/login", validator.body(loginSchema), register);

export { router as AuthRouter };
