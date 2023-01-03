import express from "express";

// Middleware
import { isLogin } from "../middlewares/authMiddleware";

// Controller
import authController from "../controller/auth";

const router = express.Router();

router.post("/login", authController.postLoginController);
router.post("/signup", authController.postSignupController);
router.get("/check", isLogin, authController.getIsLoginController);

module.exports = router;
