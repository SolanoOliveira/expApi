import { Request, Response} from 'express';
import { listTiposUsuarios} from './tipoUsuario.service';

const index = async (req: Request, res: Response) => {
    try{
        const tipos = listTiposUsuarios();
        res.status(200).json(tipos);
    }catch (e){
        res.status(500).json();
    }
}

export default { index };