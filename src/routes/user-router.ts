import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/users-controller";
import {
  validatePartialUser,
  validateUser,
  validateUserId,
} from "../validations/user-schema-validation";
import { isUserOwner } from "../middlewares/is-user-owner";

export const userRouter = express.Router();

userRouter.get("/getAllUsers",getAllUsers);
userRouter.get("/getUserById/:id", validateUserId, getUser);
userRouter.post("/createUser/",validateUser, createUser);
userRouter.put(
  "/updateUser/:id",
  validateUserId,
  validatePartialUser,
  isUserOwner,
  updateUser
);
userRouter.delete("/deleteUser/:id",validateUserId, isUserOwner, deleteUser);