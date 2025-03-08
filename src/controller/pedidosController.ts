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
  const { cliente_id, mesa} = req.body;
  if (!cliente_id || !mesa) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); 
  }

  try {
    const result = await pedidosModel.criarPedidos(cliente_id, mesa);
    return res.status(201).json({ id: result.insertId }); 
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar cliente' }); 
  }
  }

  export async function excluirPedido(req: Request, res: Response): Promise<void> {
    const pedidoId = parseInt(req.params.pedidoId);
  
    if (isNaN(pedidoId)) {
      res.status(400).json({ message: 'ID de pedido inválido.' });
      return;
    }
  
    try {
      const sucesso = await pedidosModel.excluirPedido(pedidoId);
  
      if (sucesso) {
        res.status(200).json({ message: 'Pedido excluído com sucesso.' });
      } else {
        res.status(404).json({ message: 'Pedido não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir pedido.', error});
    }
  }
