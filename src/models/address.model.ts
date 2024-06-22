import {
  AllowNull,
  BelongsTo,
  Column,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./user.model";

@Table({
  timestamps: false,
  tableName: "addresses",
})
export default class Address extends Model {
  @AllowNull(false)
  @Column
  first_name!: string;

  @AllowNull(false)
  @Column
  last_name!: string;

  @AllowNull(false)
  @Column
  country_code!: string;

  @AllowNull(false)
  @Column
  mobile!: string;

  @AllowNull(false)
  @Column
  location!: string;

  @BelongsTo(() => User, "user_id")
  user!: User;
}
