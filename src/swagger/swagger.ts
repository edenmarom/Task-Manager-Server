import { Express } from "express";
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API documentation for the Task Manager server",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: [path.resolve(__dirname, "../swagger/swagger.yaml")],
};
const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
