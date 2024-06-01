import "reflect-metadata";
import express, { Application } from "express";
import http from "http";
import cors from "cors";
import { initDB } from "./models";
import config from "./config";

const app: Application = express();
const PORT = config.port || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
