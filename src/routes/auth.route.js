import { AuthController } from "../controllers/auth.controller";

import express from "express";

const router = express.Router();

const authController = new AuthController();

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));

export default router;
