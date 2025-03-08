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
  const { pedido_id,prato_id,quantidade } = req.body;
  if (!pedido_id|| !prato_id || !quantidade) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); 
  }

  try {
    const result = await pedidopratoModel.criarPedidoprato(pedido_id,prato_id,quantidade);
    return res.status(201).json({ id: result.insertId }); 
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar pratos do pedido' }); 
  }
  }

  // Controller para excluir o prato de um pedido
export async function excluirPratoDoPedido(req: Request, res: Response): Promise<void> {
  const { pedido_id, prato_id} = req.params; // Obtém os parâmetros da URL

  // Valida se os parâmetros são números
  if (isNaN(Number(pedido_id)) || isNaN(Number(prato_id))) {
    res.status(400).json({ message: 'Parâmetros inválidos. Certifique-se de que os IDs sejam números.' });
    return;
  }

  try {
    const sucesso = await pedidopratoModel.excluirPedidoPrato(Number(pedido_id), Number(prato_id));
    
    if (sucesso) {
      res.status(200).json({ message: 'Prato excluído do pedido com sucesso.' });
    } else {
      res.status(404).json({ message: 'Pedido ou prato não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao excluir prato do pedido:', error);
    res.status(500).json({ message: 'Erro ao excluir prato do pedido.' });
  }
}