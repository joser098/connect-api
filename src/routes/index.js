import express from "express";
const router = express.Router();

import groupsRouter from "../groups/routes.js";
import authRouter from "../auth/routes.js";
import usersRouter from "../users/routes.js";

//Routes
router.use("/groups", groupsRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);

export default router;
