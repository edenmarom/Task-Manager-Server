import { Request, Response, NextFunction } from "express";
import { logger } from "../logger/logger";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);
  res.status(err.status || 500).send(err.message);
};
