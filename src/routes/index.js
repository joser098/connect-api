import express from "express";
const router = express.Router();

import groupsRouter from "../groups/routes.js";
import authRouter from "../auth/routes.js";

//Routes
router.use("/groups", groupsRouter);
router.use("/auth", authRouter);

export default router;
