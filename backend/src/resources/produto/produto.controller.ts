import { Request, Response } from "express";
import { /*produtoJaExiste,*/ createProduto, getProduto, getAllProdutos, updateProduto } from "./produto.services";
import { CreateProdutoDto, UpdateProdutoDto } from "./produto.types";

const index = async (req: Request, res: Response) => {
    try {
        const produtos = await getAllProdutos();
        res.status(200).json(produtos);
    } catch (e) {
        res.status(500).json(e);
    }
};

const create = async (req: Request, res: Response) => {
    const produto: CreateProdutoDto = req.body;
    try {
        const newProduto = await createProduto(produto);
        res.status(201).json(newProduto);
    } catch (e) {
        res.status(500).json(e);
    }

    /*
    try {
        const jaExiste = await produtoJaExiste(req.body.nome);
        if (jaExiste) return res.status(400).json({
            message: 'Produto já existe'
        });
        const produto = await createProduto(req.body);
        res.status(201).json(produto);
    } catch (e) {
        res.status(500).json({ error: e });
    }*/
};

const read = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const produto = await getProduto(id);
        if (produto === null) {
            res.status(400).json({ message: 'Produto não existe' });
        } else {
            res.status(200).json(produto);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const produto = req.body;
    try {
        const result = await updateProduto(id, produto);
        if (result === null) {
            res.status(400).json({ message: 'Produto não encontrado' });
        } else {
            res.status(200).json({ msg: 'Produto atualizado' });
        }
    } catch (e) {
        res.status(500).json(e);
    }
};

const remove = async (req: Request, res: Response) => { };

export default { index, create, read, update, remove };