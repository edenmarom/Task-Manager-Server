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
import { verifyToken } from "../middlewares/jwt-middleware";

export const userRouter = express.Router();

userRouter.get("/getAllUsers", verifyToken,getAllUsers);
userRouter.get("/getUserById/:id", verifyToken, validateUserId, getUser);
userRouter.post("/createUser/", verifyToken,validateUser, createUser);
userRouter.put(
  "/updateUser/:id",
  validateUserId,
  validatePartialUser,
  updateUser
);
userRouter.delete("/deleteUser/:id", verifyToken,validateUserId, deleteUser);
userRouter.post("/login/", validatePartialUser, login);
userRouter.post("/signup/", validatePartialUser, signup);