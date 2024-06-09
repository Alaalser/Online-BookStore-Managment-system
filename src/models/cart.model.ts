import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./user.model";
import Book from "./book.model";
import CartBook from "./cart-bookItem.model";
import { enums } from "../types";

@Table({
  timestamps: false,
  tableName: "carts",
})
export default class Cart extends Model {
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  })
  discount!: number;
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  })
  total_cost!: number;
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  })
  tax!: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: enums.CART_STATUS.IN_PROGRESS,
  })
  status!: number;

  @BelongsTo(() => User, "user_id")
  user!: User;
  @BelongsToMany(() => Book, () => CartBook)
  books!: Book[];
}
