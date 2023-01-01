import express from "express";

// Middleware
import { isLogin } from "../middlewares/authMiddleware";

// Controller
import authoController from "../controller/auth";

const router = express.Router();

router.post("/login", authoController.postLoginController);
router.post("/signup", authoController.postSignupController);
router.get("/check", isLogin, authoController.getIsLoginController);

module.exports = router;
