import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  NotEmpty,
  Unique,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BeforeCreate,
  HasMany,
} from "sequelize-typescript";
import { IUser } from "../types";
import { comparePassword, hashPassword } from "../utils/auth";
import Cart from "./cart.model";
import Order from "./order.model";
import Address from "./address.model";

@Table({
  timestamps: true,
})
export default class User extends Model implements IUser {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  name!: string;

  @Unique
  @AllowNull(false)
  @NotEmpty
  @Column
  email!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  password!: string;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  @DeletedAt
  deleted_at!: Date;

  @HasMany(() => Cart)
  carts!: Cart[];

  @HasMany(() => Order, "user_id")
  orders!: Order[];

  @HasMany(() => Address, "user_id")
  addresses!: Address[];

  @BeforeCreate
  static async encryptPassword(user: User) {
    const encryptedPassword: any = await hashPassword(user.password);
    user.password = String(encryptedPassword);
  }
}

export async function compareUserPassword(
  user: User,
  password: string
): Promise<boolean | null> {
  return comparePassword(password, user.password);
}
