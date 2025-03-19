"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./routes/router");
const nconf_1 = __importDefault(require("nconf"));
nconf_1.default.file({ file: "config/config.json" });
const app = (0, express_1.default)();
const port = nconf_1.default.get("port");
app.use(router_1.router);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
