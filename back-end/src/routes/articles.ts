import express from "express";
import articlesController from "../controller/articles";
import { isLogin } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", isLogin, articlesController.postArticleController);
// router.get("/:cursor", articlesController.getAllArticlesController);
router.get("/:articleId", articlesController.getOneArticleController);
router.patch("/:articleId", isLogin, articlesController.patchArticleController);
router.delete(
  "/:articleId",
  isLogin,
  articlesController.deleteArticleController
);

module.exports = router;
