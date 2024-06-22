import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  BelongsToMany,
} from "sequelize-typescript";
import User from "./user.model";
import CartItem from "./cart-bookItem.model";
import Book from "./book.model";
import Order from "./order.model";

@Table({
  timestamps: true,
  tableName: "cart",
})
export default class Cart extends Model {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId!: number;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;

  @DeletedAt
  @Column
  deleted_at!: Date;

  @HasMany(() => CartItem)
  cartItems!: CartItem[];

  @BelongsTo(() => User)
  user!: User;

  @HasOne(() => Order, "cart_id")
  order!: Order;

  @BelongsToMany(() => Book, () => CartItem)
  books!: Book[];
}
