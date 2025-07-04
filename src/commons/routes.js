import express from "express";
import { commonsControl } from "./controllers.js";

const commonsRouter = express.Router();

commonsRouter.get("/caba", commonsControl.getCabaLocations);

export default commonsRouter;