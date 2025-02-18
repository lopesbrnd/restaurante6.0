import { Request, Response } from 'express';
import * as pratoModel from '../models/pratoModel.js';

export async function getPrato(req: Request, res: Response) {
  try {
    const prato = await pratoModel.getPrato();
    res.json(prato);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os pratos' });
  }
}
export async function criarPrato(req: Request, res: Response): Promise<any> {
  const { nome, quantidade, preco, descricao} = req.body;
  if (!nome || !quantidade || !preco || !descricao) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); 
  }

  try {
    const result = await pratoModel.criarPrato(nome, quantidade, preco, descricao);
    return res.status(201).json({ id: result.insertId }); 
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar cliente' }); 
  }
  }
