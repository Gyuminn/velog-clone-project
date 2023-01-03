import express from "express";
import articlesController from "../controller/articles";

const router = express.Router();

router.post("/", articlesController.postArticleController);

module.exports = router;
