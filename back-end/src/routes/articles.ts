import express from "express";
import articlesController from "../controller/articles";
import { isLogin } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", isLogin, articlesController.postArticleController);

module.exports = router;
