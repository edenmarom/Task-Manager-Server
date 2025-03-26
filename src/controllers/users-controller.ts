import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import {
  createNewFullUserQuery,
  createNewUserQuery,
  deleteUserQuery,
  getAllUsersQuery,
  getUserByEmailQuery,
  getUserByIDQuery,
  updateUserQuery,
  UserDocument,
} from "../db/user-db-queries";
import { User } from "../models/user.model";
import { createToken } from "../middlewares/jwt-middleware";
import { UserModel } from "../schemas/user";
import nconf from "nconf";

const defaultImgPath = nconf.get("default-img-path");

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users: mongoose.Document[] = await getAllUsersQuery();
  res.status(200).json(users);
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const user: mongoose.Document | null = await getUserByIDQuery(id);
  user
    ? res.status(200).json(user)
    : res.status(404).send(`User [id = ${id}] not found.`);
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const savedUser: mongoose.Document = await createNewFullUserQuery(req.body);
  res.status(201).json(savedUser);
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const userToUpdate: Partial<User> = req.body;
  const updatedUser: mongoose.Query<any, any, any> = await updateUserQuery(
    id,
    userToUpdate
  );
  updatedUser
    ? res.status(200).json(updatedUser)
    : res.status(404).send(`User [id = ${id}] not found.`);
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const deletedUser: mongoose.Document | null = await deleteUserQuery(id);
  deletedUser
    ? res.status(200).json(deletedUser)
    : res.status(404).send(`User [id = ${id}] not found.`);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
   try {
     const { email, password } = req.body;
     const existingUser: UserDocument | null = await getUserByEmailQuery(email);

     if (!existingUser || !existingUser.validPassword(password)) {
       res.status(401).json({ message: "Wrong details. Please try again." });
       return;
     }

     if (existingUser._id) {
       const token = createToken(existingUser._id.toString());
       res.status(200).json({
         success: true,
         data: {
           userId: existingUser._id,
           token: token,
         },
       });
       return;
     }
     res
       .status(500)
       .json({ message: "Something went wrong. Please try again." });
   } catch (error) {
     next(error);
   }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
   try {
     const { email, password } = req.body;
     const newUser: any = new UserModel({
       email: email,
       password: "",
       name: "",
       phone: "",
       dob: "",
       imgUrl: defaultImgPath,
     });
     newUser.password = newUser.generateHash(password);
     const savedUser: UserDocument = await createNewUserQuery(newUser);
     let token = createToken(savedUser._id.toString());
     res.status(201).json({
       success: true,
       data: {
         userId: savedUser._id,
         token: token,
       },
     });
     return;
   } catch (error) {
     const err = error as Error;
     if (
       err.message ===
       "This email address is already registered. Please use a different email or log in."
     ) {
       // 409 - Conflict
       res.status(409).json({ success: false, message: err.message });
       return;
     } else {
        const error = Error("Something went wrong. Please try again.");
        next(error);
     }
   }
};
