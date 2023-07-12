import {
  Table,
  Model,
  Column,
  DataType,
  IsUUID,
  PrimaryKey,
  AllowNull,
  HasMany,
  Unique,
} from 'sequelize-typescript';

import { CompraItem } from './CompraItem';

@Table({
  timestamps: true,
})
export class Produto extends Model {
  @IsUUID('all')
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  })
  id!: string;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
  })
  nome!: string;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  preco!: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  estoque!: number;

  @HasMany(() => CompraItem)
  compraItems!: CompraItem[];
}
