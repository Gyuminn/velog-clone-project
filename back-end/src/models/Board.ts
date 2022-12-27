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
  HasMany,
} from "sequelize-typescript";
import Comment from "./Comment";
import File from "./File";
import Like from "./Like";
import Tag from "./Tag";
import User from "./User";

@Table({
  modelName: "Board",
  tableName: "Board",
  underscored: false,
  timestamps: true,
  paranoid: true,
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
})
export default class Board extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column(DataType.INTEGER)
  public board_id!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  public user_id!: number;

  @Column(DataType.STRING(40))
  public title!: string;

  @Column(DataType.TEXT)
  public content!: string;

  @AllowNull
  @Column(DataType.CHAR(200))
  public thumbnailContent!: string;

  @AllowNull
  @Default("empty.jpg")
  @Column(DataType.CHAR(200))
  public thumbnailImageUrl!: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => File)
  files: File[];

  @HasMany(() => Tag)
  tags: Tag[];

  @HasMany(() => Like)
  likes: Like[];
}
