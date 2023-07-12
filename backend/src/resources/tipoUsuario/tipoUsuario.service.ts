import { TipoUsuario } from './../../models/TipoUsuario';

export const listTiposUsuarios = async (): Promise<TipoUsuario[]> => {
    const tipos = await TipoUsuario.findAll();
    return tipos.map((t) => t.toJSON());
};
