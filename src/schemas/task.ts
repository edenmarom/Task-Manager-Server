import mongoose from "mongoose";
import { Task } from "../models/task.model";

const TaskSchema: mongoose.Schema<Task> = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  userId: String
});

export const TaskModel = mongoose.model<Task>("Task", TaskSchema);
