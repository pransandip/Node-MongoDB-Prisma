import express from "express";
const router = express.Router();
import { signUp, logIn, LogOut } from "../controller/user.controller.js";

router.route("/signup").post(signUp);
router.route("/login").post(logIn);
router.route("/logout").get(LogOut);

export { router as userRouter };
