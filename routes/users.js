import express from "express";
import UserController from "../controllers/user.js";

const router = express.Router();

router.patch("/avatar", UserController.UploadAvatar);

export default router;
