import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import User from "./user.model";
import CartItem from "./cart-bookItem.model";

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
}
