import express from "express";
import articlesController from "../controller/articles";
import { isLogin } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", articlesController.getAllArticlesController);
router.post("/", isLogin, articlesController.postArticleController);
router.get("/:articleId", articlesController.getOneArticleController);
router.patch("/:articleId", isLogin, articlesController.patchArticleController);
router.delete(
  "/:articleId",
  isLogin,
  articlesController.deleteArticleController
);
router.post(
  "/:articleId/like",
  isLogin,
  articlesController.postArticleLikeController
);

module.exports = router;
