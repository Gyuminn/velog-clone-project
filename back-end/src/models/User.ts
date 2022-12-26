import {
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Table,
  PrimaryKey,
  AutoIncrement,
  Unique,
  Default,
  AllowNull,
  DataType,
} from "sequelize-typescript";

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
  @AllowNull
  @Column(DataType.STRING(40))
  public email!: string;

  @Unique
  @Column(DataType.CHAR(40))
  public nickname!: string;

  @AllowNull
  @Column(DataType.CHAR(128))
  public password!: string;

  @AllowNull
  @Column(DataType.CHAR(200))
  public introSummary!: string;

  @AllowNull
  @Column(DataType.STRING(1000))
  public introContent!: string;

  @AllowNull
  @Default("empty.jpg")
  @Column(DataType.CHAR(200))
  public profileImageUrl!: string;

  @Default("local")
  @Column(DataType.STRING(10))
  public provider!: string;
}
