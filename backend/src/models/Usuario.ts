import {
  Table,
  Model,
  Column,
  DataType,
  IsUUID,
  PrimaryKey,
  AllowNull,
  IsEmail,
  Unique,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { TipoUsuario } from './TipoUsuario';
import { Compra } from './Compra';

@Table({
  timestamps: true,
})
export class Usuario extends Model {
  @IsUUID('all')
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  })
  id!: string;

  @ForeignKey(() => TipoUsuario)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  tipoUsuarioId!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  nome!: string;

  @AllowNull(false)
  @Unique
  @IsEmail
  @Column({
    type: DataType.STRING,
  })
  email!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  senha!: string;

  @HasMany(() => Compra)
  compras!: Compra[];
}
