import mongoose, { Query, Document, Types } from "mongoose";
import { User } from "../models/user.model";
import { UserModel } from "../schemas/user";
import { keyBy } from "lodash";

interface UserDocument extends User, Document {}


export const getAllUsersQuery = (): Query<User[], User> => {
  return UserModel.find();
};

export const getUsersQuery = async (ids: string[]): Promise<Record<string, User>> => {
  if (ids.length > 0) {
    const userList = await UserModel.find({
      _id: { $in: ids },
    });
    return keyBy(userList, "_id");
  }
  return {};
};

export const getUserByIDQuery = (
  id: string
): Query<UserDocument | null, UserDocument> => {
  return UserModel.findById(id);
};

export const createNewUserQuery = (user: User): Promise<Document> => {
  return UserModel.create(user);
};

export const updateUserQuery = (
  id: string,
  user: Partial<User>
): Query<any, any, any> => {
  return UserModel.findOneAndUpdate({ _id: id }, user, { new: true });
};

export const deleteUserQuery = (
  id: string
): mongoose.Query<Document | null, Document, {}> => {
  return UserModel.findByIdAndDelete(id);
};

