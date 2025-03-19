import "./init";
import express, { Express, Request, Response } from "express";
import { logger } from "./logger/logger";
import { router } from "./routes/router";
import { errorMiddleware } from "./middlewares/error";
import { dbConnectionStatusMiddleware } from "./middlewares/db-connection-status";
import { loggerMiddleware } from "./middlewares/logger";
import { initDb } from "./db/db";
import nconf from "nconf";
import cors from "cors";

// CHECK!
const app: Express = express();
const port = nconf.get("port");

app.use(cors());
app.use(express.json());
app.use(errorMiddleware);
app.use(loggerMiddleware);
app.use(dbConnectionStatusMiddleware);
app.use(router);

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
  initDb();
});
