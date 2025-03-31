import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import nconf from "nconf";

const secret = nconf.get("secret");

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "No token provided." });
    return;
  }
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      res.status(403).json({ message: "Failed to authenticate token." });
      return;
    }
    console.log("token userid");
    console.log((decoded as { userId: string }).userId);
    (req as AuthenticatedRequest).userId = (decoded as { userId: string }).userId;
    next();
  });
}

export const createToken = (userId: string): string => {
  return jwt.sign({ userId: userId }, secret);
};