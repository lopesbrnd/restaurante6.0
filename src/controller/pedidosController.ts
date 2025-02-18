import { Request, Response } from 'express';
import * as pedidosModel from '../models/pedidosModel.js';

export async function getPedidos(req: Request, res: Response) {
  try {
    const pedidos = await pedidosModel.getPedidos();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os pedidos' });
  }
}

export async function criarPedidos(req: Request, res: Response): Promise<any> {
  const { cliente, prato} = req.body;
  if (!cliente || !prato) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); 
  }

  try {
    const result = await pedidosModel.criarPedidos(cliente, prato);
    return res.status(201).json({ id: result.insertId }); 
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar cliente' }); 
  }
  }
