import "reflect-metadata";
import express, { Application } from "express";
import http from "http";
import cors from "cors";
import { initDB } from "./models";
import config from "./config";
import routes from "./routes";
import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "./utils/ApiError";
import ErrorHandler from "./middlewares/ErrorHandler";

const app: Application = express();
const PORT = config.port || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);

app.use((req: Request, res: Response, next: NextFunction) =>
  next(new NotFoundError(req.path))
);
app.use(ErrorHandler.handle());
let server: http.Server;
let dbClient: any;
const startServer = async () => {
  try {
    dbClient = await initDB();
    server = app.listen(PORT, (): void => {
      console.log(`Connected successfully on port ${PORT}`);
    });
  } catch (error: any) {
    console.error(`Error occurred: ${error.message}`);
  }
};

startServer();

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (dbClient) dbClient.close();
  if (server) server.close();
});
