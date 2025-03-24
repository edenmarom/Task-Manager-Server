import { Mongoose } from "mongoose";
import mongoose from "mongoose";

export interface Task extends mongoose.Document {
  title: string;
  description: string;
  status: string;
  userId: string;
}