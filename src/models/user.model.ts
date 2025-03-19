import { Mongoose } from "mongoose";
import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  dob: string;
  imgUrl: string;
}
