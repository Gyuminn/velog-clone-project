import express from "express";

// Middleware
import { isLogin } from "../middlewares/authMiddleware";

// Controller
import commentsController from "../controller/comments";

const router = express.Router();

router.post("/", isLogin, commentsController.postCommentController);

module.exports = router;
