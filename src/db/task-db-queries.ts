import mongoose, { Query, Document, Types } from "mongoose";
import { Task } from "../models/task.model";
import { TaskModel } from "../schemas/task";
import { keyBy } from "lodash";

interface TaskDocument extends Task, Document {}


export const getAllTasksQuery = (): Query<Task[], Task> => {
  return TaskModel.find();
};

export const getTasksQuery = async (ids: string[]): Promise<Record<string, Task>> => {
  if (ids.length > 0) {
    const taskList = await TaskModel.find({
      _id: { $in: ids },
    });
    return keyBy(taskList, "_id");
  }
  return {};
};

export const getTaskByIDQuery = (
  id: string
): Query<TaskDocument | null, TaskDocument> => {
  return TaskModel.findById(id);
};

export const createNewTaskQuery = (task: Task): Promise<Document> => {
  return TaskModel.create(task);
};

export const updateTaskQuery = (
  id: string,
  task: Partial<Task>
): Query<any, any, any> => {
  return TaskModel.findOneAndUpdate({ _id: id }, task, { new: true });
};

export const deleteTaskQuery = (
  id: string
): mongoose.Query<Document | null, Document, {}> => {
  return TaskModel.findByIdAndDelete(id);
};

