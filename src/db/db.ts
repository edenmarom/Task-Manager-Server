import mongoose from "mongoose";
import nconf from "nconf";
import { logger } from "../logger/logger";

const connectionString: string = nconf.get("db:connectionString");
const connectionOptions: object = nconf.get("db:connectionOptions");
export let db: mongoose.Connection;

export const initDb = () => {
  db = mongoose.connection;

  db.on("connected", () => {
    logger.info("DB connected!");
  }),
  db.on("disconnected", () => {
      logger.error("DB disconnected! Trying to reconnect...");
      mongoose.connect(connectionString, connectionOptions);
    });
  db.on("error", (error) => {
    logger.error("DB connection error : " + error);
  });
  mongoose
    .connect(connectionString, connectionOptions)
    .catch((error) => logger.error("DB connection error : " + error));
};
