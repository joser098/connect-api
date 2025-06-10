import express from "express";
import { authControl } from "../auth/controller.js";

const authRouter = express.Router();

authRouter.post("/login", authControl.login);

export default authRouter;