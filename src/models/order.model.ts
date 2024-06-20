import {
  AllowNull,
  BelongsTo,
  Column,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./user.model";
import Cart from "./cart.model";
import Address from "./address.model";

@Table({
  timestamps: false,
  tableName: "orders",
})
export default class Order extends Model {
  @AllowNull(true)
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  status!: number;

  @AllowNull(false)
  @Column
  transaction_id!: number;

  @BelongsTo(() => User, "user_id")
  user!: User;

  @BelongsTo(() => Cart, "cart_id")
  cart!: Cart;

  @BelongsTo(() => Address, "address_id")
  address!: Address;
}
