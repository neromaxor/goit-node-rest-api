import express from "express";
import AuthController from "../controllers/auth.js";
import validateBody from "../helpers/validateBody.js";
import { createUserSchema } from "../schemas/userSchemas.js";
import authMiddleware from "../middleware/auth.js";
import uploadMiddleware from "../middleware/upload.js";
const userRouter = express.Router();

userRouter.post(
  "/register",
  validateBody(createUserSchema),
  AuthController.register
);
userRouter.post("/login", validateBody(createUserSchema), AuthController.login);
userRouter.get("/logout", authMiddleware, AuthController.logout);
userRouter.get("/current", authMiddleware, AuthController.current);
userRouter.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  AuthController.uploadAvatar
);

export default userRouter;
