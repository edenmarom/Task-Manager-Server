import express from "express";
import { createTask, deleteTask, getAllTasks, getTask, updateTask, getTasksByUserId } from "../controllers/tasks-controller";
import { validatePartialTask, validateTask, validateTaskId } from "../validations/task-schema-validation";
import { validateUserId } from "../validations/user-schema-validation";
import { isTaskOwner } from "../middlewares/is-task-owner";

export const tasksRouter = express.Router();

tasksRouter.get("/getAllTasks", getAllTasks);
tasksRouter.get("/getTaskById/:id", validateTaskId, getTask);
tasksRouter.get("/getTasksByUserId/:id",validateUserId, getTasksByUserId);
tasksRouter.post("/createTask", validateTask, createTask);
tasksRouter.put(
  "/updateTask/:id",
  validateTaskId,
  validatePartialTask,
  isTaskOwner,
  updateTask
);
tasksRouter.delete("/deleteTask/:id",validateTaskId, isTaskOwner, deleteTask);


