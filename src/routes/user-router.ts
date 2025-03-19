import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/users-controller";
import { validatePartialUser, validateUser, validateUserId } from "../validations/user-schema-validation";

export const userRouter = express.Router();

userRouter.get("/getAllUsers", getAllUsers);
userRouter.get("/getUserByid/:id", validateUserId, getUser);
userRouter.post("/createUser/", validateUser, createUser);
userRouter.put(
  "/updateUser/:id",
  validateUserId,
  validatePartialUser,
  updateUser
);
userRouter.delete("/deleteUser/:id", validateUserId, deleteUser);
