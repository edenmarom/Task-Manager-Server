import express from "express";
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "../controllers/tasks-controller";
import { validatePartialTask, validateTask, validateTaskId } from "../validations/task-schema-validation";

export const tasksRouter = express.Router();

tasksRouter.get("/getAllTasks", getAllTasks);
tasksRouter.get("/getTaskById/:id", validateTaskId, getTask);
tasksRouter.post("/createTask", validateTask, createTask);
tasksRouter.put(
  "/updateTask/:id",
  validateTaskId,
  validatePartialTask,
  updateTask
);
tasksRouter.delete("/deleteTask/:id", validateTaskId, deleteTask);


