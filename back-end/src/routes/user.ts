import express from "express";

// Middleware
import { isLogin } from "../middlewares/authMiddleware";

// Controller
import userController from "../controller/user";

const router = express.Router();

router.get("/myinfo", isLogin, userController.getMyInfoController);

module.exports = router;
