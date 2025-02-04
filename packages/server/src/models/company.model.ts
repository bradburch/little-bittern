import {
  Model,
  Table,
  Column,
  DataType,
  IsUrl,
  AllowNull,
} from 'sequelize-typescript';

@Table
export default class Company extends Model {
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  declare name: string;

  @IsUrl
  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare url: string;
}
