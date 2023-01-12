import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  Unique,
  Default,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Board from "./Board";
import User from "./User";

@Table({
  modelName: "Comment",
  tableName: "Comment",
  underscored: false,
  timestamps: true,
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
})
export default class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column(DataType.INTEGER)
  public comment_id!: number;

  @ForeignKey(() => Board)
  @AllowNull(false)
  @Column
  public board_id!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  public user_id!: number;

  @AllowNull(false)
  @Column
  public commenter!: string;

  @Column(DataType.INTEGER)
  public parent!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public level!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public root_index!: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public content!: string;

  @Default(false)
  @Column
  public isDeleted!: boolean;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Board)
  board: Board;
}
