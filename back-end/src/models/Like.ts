import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  Unique,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import Board from "./Board";
import User from "./User";

@Table({
  modelName: "Like",
  tableName: "Like",
  underscored: false,
  timestamps: true,
  paranoid: true,
  charset: "utf8",
  collate: "utf8_general_ci",
})
export default class Like extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column(DataType.INTEGER)
  public like_id!: number;

  @ForeignKey(() => Board)
  @AllowNull(false)
  @Column
  public board_id!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  public user_id!: number;

  @BelongsTo(() => Board)
  board: Board;

  @BelongsTo(() => User)
  user: User;
}
