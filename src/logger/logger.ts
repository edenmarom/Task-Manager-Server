import nconf from "nconf";
import { createLogger, transports, format } from "winston";

const { combine, timestamp, printf } = format;
const myFormat = printf((info) => {
  if (info instanceof Error) {
    return `${info.timestamp} >> [${info.level}]: ${info.message}
                                  >> StackTrace: ${info.stack} `;
  }
  return `${info.timestamp} >> [${info.level}]: ${info.message}`;
});

export const logger = createLogger({
  transports: [
    new transports.File({
      dirname: nconf.get("logger:dirname"),
      filename: nconf.get("logger:filename"),
      level: nconf.get("logger:level"),
      format: combine(
        timestamp(),
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        myFormat
      ),
    }),
    new transports.Console({
      level: "info",
      format: combine(
        timestamp(),
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.colorize(),
        myFormat
      ),
    }),
  ],
});
