import { Request, Response } from 'express';
import * as clienteModel from '../models/clienteModel.js';

export async function getCliente(req: Request, res: Response) {
  try {
    const cliente = await clienteModel.getClientes();
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes' });
  }
}

export async function criarCliente(req: Request, res: Response): Promise<any> {
  const { nome, numero } = req.body;
  if (!nome || !numero) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); 
  }

  try {
    const result = await clienteModel.criarCliente(nome, numero);
    return res.status(201).json({ id: result.insertId }); 
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar cliente' }); 
  }
  }
