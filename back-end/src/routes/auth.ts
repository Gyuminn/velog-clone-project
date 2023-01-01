import express from "express";

// Middleware
// import { auth } from "../middlewares/authMiddleware";

// Controller
import authoController from "../controller/auth";

const router = express.Router();

router.post("/login", authoController.postLoginController);
router.post("/signup", authoController.postSignupController);

module.exports = router;
