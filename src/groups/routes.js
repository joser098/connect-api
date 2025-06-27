import express from "express";
import { groupsControl } from "../groups/controllers.js";

const groupsRouter = express.Router();

groupsRouter.get("/", groupsControl.getAllGroups);
groupsRouter.get("/assignments", groupsControl.getAssignments);
groupsRouter.post("/assignments", groupsControl.createAssignment);
groupsRouter.put("/assignments/:id", groupsControl.updateAssignmentStatus);
groupsRouter.put("/assign/:id", groupsControl.assignGroup);
export default groupsRouter;