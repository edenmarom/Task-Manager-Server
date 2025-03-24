import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  login,
  signup,
  updateUser,
} from "../controllers/users-controller";
import {
  validatePartialUser,
  validateUser,
  validateUserId,
} from "../validations/user-schema-validation";

export const userRouter = express.Router();

userRouter.get("/getAllUsers", getAllUsers);
userRouter.get("/getUserById/:id", validateUserId, getUser);
userRouter.post("/createUser/", validateUser, createUser);
userRouter.put(
  "/updateUser/:id",
  validateUserId,
  validatePartialUser,
  updateUser
);
userRouter.delete("/deleteUser/:id", validateUserId, deleteUser);
userRouter.post("/login/", validatePartialUser, login);
userRouter.post("/signup/", validatePartialUser, signup);