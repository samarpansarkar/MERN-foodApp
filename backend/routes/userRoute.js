import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { validateRegister, validateLogin } from "../middleware/validation.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const userRouter = express.Router();

userRouter.post("/register", authLimiter, validateRegister, registerUser);

userRouter.post("/login", authLimiter, validateLogin, loginUser);

export default userRouter;
