import { Request, Response, NextFunction } from "express";
import { logger } from "../logger/logger";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`>> Server got ${req.method} Request: ${req.originalUrl}`);
  const originalSend = res.send;
  
  res.send = function (body) {
    logger.info(
      `>> Body: ${typeof body === "object" ? JSON.stringify(body) : body}`
    );
    originalSend.call(this, body);
    return this;
  };

  res.on("finish", () => {
    logger.info(`>> Status: ${res.statusCode.toString()}`);
  });

  next();
};
