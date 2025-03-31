import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./jwt-middleware";

export async function isUserOwner(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    try {
       if (userId !== (req as AuthenticatedRequest).userId) {
         res.status(403).json({ message: "Unauthorized access" });
         return;
       }
        next();
    } 
    catch(error){
        res.status(500).json({ message: "Error verifying user ownership", error: error });
        return;
    }
}