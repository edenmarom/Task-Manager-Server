import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import {
  createNewUserQuery,
  deleteUserQuery,
  getAllUsersQuery,
  getUserByIDQuery,
  updateUserQuery,
} from "../db/user-db-queries";
import { User } from "../models/user.model";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const users: mongoose.Document[] = await getAllUsersQuery();
    res.status(200).json(users);
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const user: mongoose.Document | null = await getUserByIDQuery(id);
  user
    ? res.status(200).json(user)
    : res.status(404).send(`User [id = ${id}] not found.`);
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const savedUser: mongoose.Document = await createNewUserQuery(
    req.body
  );
  res.status(201).json(savedUser);
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const usertToUpdate: Partial<User> = req.body;
  const updatedUser: mongoose.Query<any, any, any> = await updateUserQuery(
    id,
    usertToUpdate
  );
  updatedUser
    ? res.status(200).json(updatedUser)
    : res.status(404).send(`User [id = ${id}] not found.`);
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const deletedUser: mongoose.Document | null = await deleteUserQuery(id);
  deletedUser
    ? res.status(200).json(deletedUser)
    : res.status(404).send(`User [id = ${id}] not found.`);
};
