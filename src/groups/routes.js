import express from "express";
import { groupsControl } from "../groups/controllers.js";

const groupsRouter = express.Router();

groupsRouter.get("/", groupsControl.getAllGroups);
groupsRouter.get("/assignments", groupsControl.getAssignments);

export default groupsRouter;