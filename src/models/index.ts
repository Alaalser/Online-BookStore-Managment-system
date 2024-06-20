import { Sequelize } from "sequelize-typescript";
import config from "../config";
import User from "./user.model";
import Book from "./book.model";
import Cart from "./cart.model";
import CartItem from "./cart-bookItem.model";
import Order from "./order.model";
import Address from "./address.model";

export const sequelize = new Sequelize({
  host: config.dbHost,
  database: config.dbName,
  username: config.dbUser,
  password: config.dbPassword,
  dialect: "mysql",
  logging: false,
  models: [User, Book, Cart, CartItem, Order, Address],
});

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
