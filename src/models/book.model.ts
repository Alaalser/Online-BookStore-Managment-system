import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  NotEmpty,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from "sequelize-typescript";
import User from "./user.model"; // Import the User model

@Table({
  timestamps: true,
})
export default class Book extends Model {
  @PrimaryKey
  @AutoIncrement
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

  @BelongsTo(() => User)
  userId?: number;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  @DeletedAt
  deleted_at!: Date;
}
