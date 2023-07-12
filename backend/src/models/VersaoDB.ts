import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  AllowNull,
  IsUUID,
} from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
})
export class VersaoDB extends Model {
  @IsUUID('all')
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  })
  id!: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  schemaVersao!: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  seedVersao!: number;
}
