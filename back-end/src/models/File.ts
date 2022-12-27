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

@Table({
  modelName: "File",
  tableName: "File",
  underscored: false,
  timestamps: true,
  paranoid: true,
  charset: "utf8",
  collate: "utf8_general_ci",
})
export default class File extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column(DataType.INTEGER)
  public file_id!: number;

  @ForeignKey(() => Board)
  @AllowNull(false)
  @Column
  public board_id!: number;

  @Column(DataType.CHAR(200))
  public fileUrl!: string;

  @BelongsTo(() => Board)
  board: Board;
}
