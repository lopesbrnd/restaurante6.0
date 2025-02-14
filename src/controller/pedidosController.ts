import { Request, Response } from 'express';
import * as pedidosModel from '../models/pedidosModel';

// Função para obter os alunos
export async function getPedidos(req: Request, res: Response) {
  try {
    const pedidos = await pedidosModel.getPedidos();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os pedidos' });
  }
}
