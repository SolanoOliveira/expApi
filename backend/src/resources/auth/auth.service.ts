import bcrypt from 'bcryptjs';
import { Usuario } from '../../models/Usuario';
import { LoginDto } from './auth.types';

export const checkCredentials = async ({
    email,
    senha
}: LoginDto): Promise<Usuario | null> => {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return null;
    const ok = bcrypt.compare(senha, usuario.senha)
    return ok ? usuario : null;
};
