import * as express from "express";
import { tasksRouter } from "./tasks-router";
import { userRouter } from "./user-router";

export const router = express.Router();
router.use("/tasks", tasksRouter);
router.use("/user", userRouter);

