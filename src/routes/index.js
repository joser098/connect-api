import express from "express";
const router = express.Router();

import groupsRouter from "../groups/routes.js";
import authRouter from "../auth/routes.js";
import usersRouter from "../users/routes.js";
import commonsRouter from "../commons/routes.js";
import zonesRouter from "../zones/routes.js";

//Routes
router.use("/groups", groupsRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/common", commonsRouter);
router.use("/zones", zonesRouter);

export default router;
