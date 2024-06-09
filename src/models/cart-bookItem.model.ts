import {
  AllowNull,
  Column,
  Default,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import Book from "./book.model";
import Cart from "./cart.model";

@Table({
  timestamps: false,
  tableName: "cart_book_item",
})
export default class CartBook extends Model {
  @ForeignKey(() => Book)
  @Column
  @AllowNull(false)
  book_id!: number;

  @ForeignKey(() => Cart)
  @Column
  @AllowNull(false)
  cart_id!: number;

  @Column
  @AllowNull(false)
  @Default(1)
  quantity!: number;

  @HasMany(() => Book, "id")
  books!: Book[];
}
