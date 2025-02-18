import { Request, Response } from 'express';
import * as pedidopratoModel from '../models/pedidopratoModel.js';

export async function getPedidoprato(req: Request, res: Response) {
    try {
      const pedidoprato = await pedidopratoModel.getPedidoprato();
      res.json(pedidoprato);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar os pedidos das mesas' });
    }
}

export async function criarPedidoprato(req: Request, res: Response): Promise<any> {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); 
  }

  try {
    const result = await pedidopratoModel.criarPedidoprato(nome);
    return res.status(201).json({ id: result.insertId }); 
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar pratos do pedido' }); 
  }
  }
