import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  IsUrl,
  AllowNull,
} from 'sequelize-typescript';
import Company from './company.model.js';

@Table
export default class Job extends Model {
  @Column({ type: DataType.STRING })
  declare title: string;

  @IsUrl
  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare url: string;

  @Column({ type: DataType.JSON })
  declare applicationText: JSON;

  @Column({ type: DataType.BOOLEAN })
  declare applied: boolean;

  @Column({ type: DataType.TEXT })
  declare location: string;

  @AllowNull(false)
  @ForeignKey(() => Company)
  @Column({ type: DataType.INTEGER })
  declare companyId: number;

  @BelongsTo(() => Company)
  declare company: Company;
}
