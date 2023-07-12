import {
  Table,
  Model,
  Column,
  DataType,
  IsUUID,
  PrimaryKey,
  AllowNull,
  Unique,
  Length,
  HasMany,
} from 'sequelize-typescript';
import { Usuario } from './Usuario';

@Table({
  timestamps: true,
})
export class TipoUsuario extends Model {
  @IsUUID('all')
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  })
  id!: string;

  @Length({
    min: 3,
    max: 50,
    msg: 'O rótulo precisa conter entre 3 e 50 caracteres',
  })
  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
  })
  rotulo!: string;

  @HasMany(() => Usuario)
  departamentos!: Usuario[];
}
