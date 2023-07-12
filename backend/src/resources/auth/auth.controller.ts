import { Request, Response } from 'express';
import { checkCredentials } from './auth.service';

const signup = async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;
    try {
        const usuario = await buscarUsuarioPorEmail(email);
        if (usuario) return res.status(400).json({
            msn: 'Já existe um usuário com email informado'
        });
        const newUsuario = await createUsuario({
            nome,
            email,
            senha,
            tipoUsuarioId: TiposUsuarios.CLIENTE
        });
        res.status(200).json(newUsuario);
    } catch (e) {
        res.status(500).json(e);
    }
};

const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    try {
        const usuario = await checkCredentials({ email, senha });
        if (!usuario) return res.status(401).json({
            msg: 'O email e/ou a senha estão incorretos.'
        });
        req.session.uid = usuario.id;
        req.session.tipoUsuarioId = usuario.
        res.status(200).json({msg: 'Usuário logou com sucesso !'});
    }catch (e) {
        res.status(500).json(e);
    }
};
const logout = (req: Request, res: Response) => { 
    if(req.session.uid) {
        req.session.destroy((err) => {
            if(err) return res.status(500).json(err);
            res.status(200).json({
                msg: 'O logout foi feito com sucesso'
            });
        })
    }else{
        res.status(400).json({
            msg: 'O usuário não está logado'
        })
    }
};

export default { signup, login, logout };
