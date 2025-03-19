import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { logger } from "../logger/logger";

export const dbConnectionStatusMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (mongoose.connection.readyState !== mongoose.STATES.connected) {
    res.status(503).send("Service Unavailable");
    logger.error("Db unavailable");
    return;
  }
  next();
};
