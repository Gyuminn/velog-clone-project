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
  HasMany,
} from "sequelize-typescript";
import Board from "./Board";
import Comment from "./Comment";
import Like from "./Like";
import Tag from "./Tag";

@Table({
  modelName: "User",
  tableName: "User",
  underscored: false,
  timestamps: true,
  paranoid: true,
  charset: "utf8",
  collate: "utf8_general_ci",
})
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column(DataType.INTEGER)
  public user_id!: number;

  @Unique
  @Column(DataType.STRING(40))
  public email!: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.CHAR(40))
  public nickname!: string;

  @Column(DataType.CHAR(128))
  public password!: string;

  @Column(DataType.CHAR(200))
  public introSummary!: string;

  @Column(DataType.STRING(1000))
  public introContent!: string;

  @Default("empty.jpg")
  @Column(DataType.CHAR(200))
  public profileImageUrl!: string;

  @Default("local")
  @AllowNull(false)
  @Column(DataType.STRING(10))
  public provider!: string;

  @HasMany(() => Board)
  boards: Board[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Tag)
  tags: Tag[];

  @HasMany(() => Like)
  likes: Like[];
}
