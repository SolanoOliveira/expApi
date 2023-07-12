import {
  Table,
  Model,
  Column,
  DataType,
  IsUUID,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';

import { CompraItem } from './CompraItem';
import { Usuario } from './Usuario';

@Table({
  timestamps: true,
})
export class Compra extends Model {
  @IsUUID('all')
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  })
  id!: string;

  @ForeignKey(() => Usuario)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  usuarioId!: string;

  @HasMany(() => CompraItem)
  items!: CompraItem[];
}
