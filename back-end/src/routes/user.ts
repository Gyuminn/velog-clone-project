import express from "express";

// Middleware
import { isLogin } from "../middlewares/authMiddleware";

// Controller
import userController from "../controller/user";

const router = express.Router();

router.get("/myinfo", isLogin, userController.getMyInfoController);
router.patch("/myinfo", isLogin, userController.patchMyInfoController);
router.get("/myinfo/like", isLogin, userController.getLikePostController);

module.exports = router;
