import express from "express";
import { zonesControl } from "./controllers.js";

const zonesRouter = express.Router();

zonesRouter.get("/", zonesControl.getZones);
zonesRouter.get("/leaders", zonesControl.getAllLeaders);

export default zonesRouter;