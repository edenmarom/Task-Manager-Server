import * as express from "express";
import { tasksRouter } from "./tasks-router";
import { userRouter } from "./user-router";
import { authRouter } from "./auth-router";
import { verifyToken } from "../middlewares/jwt-middleware";

export const router = express.Router();

router.use((req, res, next) => {
    if (req.path.startsWith("/auth/")) {
      next();
    } else {
      verifyToken(req, res, next);
    }
});

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/tasks", tasksRouter);

