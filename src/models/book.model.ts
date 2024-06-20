import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  NotEmpty,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany,
} from "sequelize-typescript";
import Cart from "./cart.model";
import CartItem from "./cart-bookItem.model";

@Table({
  timestamps: true,
  tableName: "books",
})
export default class Book extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  title!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  author!: string;

  @Column
  genre?: string;

  @Column
  price?: string;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  @DeletedAt
  deleted_at!: Date;

  @BelongsToMany(() => Cart, () => CartItem)
  carts!: Cart[];
}
