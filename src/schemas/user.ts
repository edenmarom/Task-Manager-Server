import mongoose, { Model } from "mongoose";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import nconf from "nconf";

const saltRounds = nconf.get("bcrypt-salt-rounds");

export interface UserModelMethods {
  generateHash(password: string): string;
  validPassword(password: string): boolean;
}

const UserSchema: mongoose.Schema<User> = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  dob: String,
  imgUrl: String,
});

UserSchema.methods.generateHash = function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
};

UserSchema.methods.validPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

export const UserModel = mongoose.model<User, Model<User, UserModelMethods>>(
  "User",
  UserSchema
);

