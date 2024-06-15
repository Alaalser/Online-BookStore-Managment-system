import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  Default,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import Book from "./book.model";
import Cart from "./cart.model";

@Table({
  timestamps: false,
  tableName: "cart_book_item",
})
export default class CartItem extends Model {
  @ForeignKey(() => Book)
  @AllowNull(false)
  @Column
  book_id!: number;

  @ForeignKey(() => Cart)
  @AllowNull(false)
  @Column
  cart_id!: number;

  @AllowNull(false)
  @Default(1)
  @Column
  quantity!: number;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  @DeletedAt
  deleted_at!: Date;

  @BelongsTo(() => Book)
  book!: Book;

  @BelongsTo(() => Cart)
  cart!: Cart;
}
