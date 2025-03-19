import mongoose from "mongoose";
import { User } from "../models/user.model";

const UserSchema: mongoose.Schema<User> = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dob: String,
  imgUrl: String,
});

export const UserModel = mongoose.model<User>("User", UserSchema);
