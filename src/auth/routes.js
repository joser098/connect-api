import express from "express";
import { authControl } from "../auth/controller.js";

const authRouter = express.Router();

authRouter.post("/login", authControl.login);
authRouter.get("/verify-reset-password-hash/:hash", authControl.verifyResetPasswordHash);
authRouter.post("/reset-password", authControl.resetPassword);

export default authRouter;