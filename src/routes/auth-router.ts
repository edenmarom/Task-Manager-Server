import express from "express";
import { login, signup } from "../controllers/users-controller";
import { validatePartialAuthUser } from "../validations/user-schema-validation";

export const authRouter = express.Router();

authRouter.post("/login/", validatePartialAuthUser, login);
authRouter.post("/signup/", validatePartialAuthUser, signup);