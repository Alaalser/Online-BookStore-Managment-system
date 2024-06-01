import { Sequelize } from "sequelize-typescript";
import config from "../config";

export const sequelize = new Sequelize({
  host: config.dbHost,
  database: config.dbName,
  username: config.dbUser,
  password: config.dbPassword,
  dialect: "mysql",
  logging: false,
});

sequelize.addModels([]);

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ alter: true });
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
