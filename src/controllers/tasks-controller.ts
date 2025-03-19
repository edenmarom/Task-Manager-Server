import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import {
  createNewTaskQuery,
  deleteTaskQuery,
  getAllTasksQuery,
  getTaskByIDQuery,
  updateTaskQuery,
} from "../db/task-db-queries";
import { Task } from "../models/task.model";

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tasks: mongoose.Document[] = await getAllTasksQuery();
  res.status(200).json(tasks);
  await next();
};

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const task: mongoose.Document | null = await getTaskByIDQuery(id);
  task
    ? res.status(200).json(task)
    : res.status(404).send(`Task [id = ${id}] not found.`);
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const savedTask: mongoose.Document = await createNewTaskQuery(req.body);
  res.status(201).json(savedTask);
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const taskToUpdate: Partial<Task> = req.body;
  const updatedTask: mongoose.Document | null = await updateTaskQuery(
    id,
    taskToUpdate
  );
  updatedTask
    ? res.status(200).json(updatedTask)
    : res.status(404).send(`Task [id = ${id}] not found.`);
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const deletedTask: mongoose.Document | null = await deleteTaskQuery(id);
  deletedTask
    ? res.status(200).json(deletedTask)
    : res.status(404).send(`Task [id = ${id}] not found.`);
};
