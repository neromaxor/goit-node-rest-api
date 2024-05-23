import express from "express";
import { register, logout, getCurrentUser } from "../controllers/auth.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/register", register);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, getCurrentUser);

export default router;
