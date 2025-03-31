import { Request, Response, NextFunction } from "express";
import { getTaskByIDQuery, TaskDocument } from "../db/task-db-queries";
import { AuthenticatedRequest } from "./jwt-middleware";

export async function isTaskOwner(req: Request, res: Response, next: NextFunction) {
    const taskId = req.params.id;
    console.log(taskId)
    console.log(req.params)

    try {
        const task: TaskDocument | null = await getTaskByIDQuery(taskId);
        if (!task) {
            res.status(404).send(`Task [id = ${taskId}] not found.`);
            return;
        }
        console.log(task.userId)
        console.log((req as AuthenticatedRequest).userId)

        if (task.userId !== (req as AuthenticatedRequest).userId) {
            res.status(403).json({ message: "Unauthorized access" });
            return;
        }




        next();
    } 
    catch(error){
        res.status(500).json({ message: "Error verifying task ownership", error: error });
        return;
    }
}