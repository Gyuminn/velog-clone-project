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
} from "sequelize-typescript";
import Board from "./Board";
import User from "./User";

@Table({
  modelName: "Tag",
  tableName: "Tag",
  underscored: false,
  timestamps: true,
  paranoid: true,
  charset: "utf8",
  collate: "utf8_general_ci",
})
export default class Tag extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column(DataType.INTEGER)
  public tag_id!: number;

  @ForeignKey(() => Board)
  @Column
  public board_id!: number;

  @ForeignKey(() => User)
  @Column
  public user_id!: number;

  @Column(DataType.CHAR(15))
  public tagName!: string;

  @BelongsTo(() => Board)
  board: Board;

  @BelongsTo(() => User)
  user: User;
}
