"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const models_1 = require("./models");
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const PORT = config_1.default.port || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
let server;
let dbClient;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dbClient = yield (0, models_1.initDB)();
        server = app.listen(PORT, () => {
            console.log(`Connected successfully on port ${PORT}`);
        });
    }
    catch (error) {
        console.error(`Error occurred: ${error.message}`);
    }
});
startServer();
process.on("SIGTERM", () => {
    console.info("SIGTERM received");
    if (dbClient)
        dbClient.close();
    if (server)
        server.close();
});
