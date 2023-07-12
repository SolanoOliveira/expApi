import { Usuario } from "../../models/Usuario";

export type LoginDto = Pick<Usuario, 'email' | 'senha'>;