import express from "express";
import { login, signup } from "../controllers/users-controller";
import { validatePartialUser } from "../validations/user-schema-validation";

export const authRouter = express.Router();

authRouter.post("/login/", validatePartialUser, login);
authRouter.post("/signup/", validatePartialUser, signup);