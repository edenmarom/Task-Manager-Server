import "./init";
import express, { Express } from "express";
import { logger } from "./logger/logger";
import { router } from "./routes/router";
import { errorMiddleware } from "./middlewares/error";
import { dbConnectionStatusMiddleware } from "./middlewares/db-connection-status";
import { loggerMiddleware } from "./middlewares/logger";
import { initDb } from "./db/db";
import { setupSwagger } from "./swagger/swagger";
import nconf from "nconf";
import cors from "cors";

const app: Express = express();
const port = nconf.get("port");

app.use(cors());
app.use(express.json());
app.use(errorMiddleware);
app.use(loggerMiddleware);
app.use(dbConnectionStatusMiddleware);
app.use(router);
setupSwagger(app);


app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
  logger.info(`Swagger Docs available at http://localhost:${port}/api-docs`);
  initDb();
});
