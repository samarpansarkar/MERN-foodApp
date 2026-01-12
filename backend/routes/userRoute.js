import express from "express";
import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  addAddress,
  removeAddress,
} from "../controllers/user.controller.js";
import { validateRegister, validateLogin } from "../middleware/validation.js";
import { authLimiter } from "../middleware/rateLimiter.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", authLimiter, validateRegister, registerUser);
userRouter.post("/login", authLimiter, validateLogin, loginUser);

// Profile routes
userRouter.get("/profile", authMiddleware, getProfile);
userRouter.put("/profile", authMiddleware, updateProfile);

// Address routes
userRouter.post("/address/add", authMiddleware, addAddress);
userRouter.post("/address/remove", authMiddleware, removeAddress);

export default userRouter;
