import express from "express";
const router = express.Router();
import { signUp } from "../controller/user.controller.js";

router.route("/signup").post(signUp);

export { router as signupRouter };
