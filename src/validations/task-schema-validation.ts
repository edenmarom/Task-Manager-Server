import Joi from "@hapi/joi";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const taskDataSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string(),
});

export const validateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await taskDataSchema.validateAsync(req.body, {
      abortEarly: false,
      presence: "required",
    });
    next();
  } catch (err: any) {
    res
      .status(400)
      .send(err.details.map((detail: any) => detail.message).join(", "));
  }
};

export const validatePartialTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await taskDataSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err: any) {
    res
      .status(400)
      .send(err.details.map((detail: any) => detail.message).join(", "));
  }
};

export const validateTaskId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    next();
  } else {
    res.status(404).send(`Task [id = ${id}] not found.`);
  }
};
