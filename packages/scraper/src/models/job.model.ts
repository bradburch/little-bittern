import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  IsUrl,
  NotNull,
  AllowNull,
} from "sequelize-typescript";
import Company from "./company.model.js";
import { Json } from "sequelize/types/utils";

@Table
export default class Job extends Model {
  @Column({ type: DataType.STRING })
  declare title: string;

  @IsUrl
  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare url: string;

  @Column({ type: DataType.JSON })
  declare applicationText: Json;

  @Column({ type: DataType.BOOLEAN })
  declare applied: boolean;

  @AllowNull(false)
  @ForeignKey(() => Company)
  @Column({ type: DataType.INTEGER })
  declare companyId: string;

  @BelongsTo(() => Company)
  declare company: Company;
}
