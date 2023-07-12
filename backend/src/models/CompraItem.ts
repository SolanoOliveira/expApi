import {
  Table,
  Model,
  Column,
  DataType,
  IsUUID,
  PrimaryKey,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';

import { Compra } from './Compra';
import { Produto } from './Produto';

@Table({
  timestamps: true,
})
export class CompraItem extends Model {
  @IsUUID('all')
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  })
  id!: string;

  @ForeignKey(() => Compra)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  compraId!: string;

  @ForeignKey(() => Produto)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  produtoId!: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  quantidade!: number;
}
