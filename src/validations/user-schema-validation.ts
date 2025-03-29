import Joi from "@hapi/joi";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const userDataSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  phone: Joi.string(),
  dob: Joi.string(),
  imgUrl: Joi.string(),
});

const partialAuthUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userDataSchema.validateAsync(req.body, {
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

export const validatePartialAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await partialAuthUserSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err: any) {
    res
      .status(400)
      .send(err.details.map((detail: any) => detail.message).join(", "));
  }
};

export const validatePartialUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userDataSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err: any) {
    res
      .status(400)
      .send(err.details.map((detail: any) => detail.message).join(", "));
  }
};

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    next();
  } else {
    res.status(404).send(`User [id = ${id}] not found.`);
  }
};
