import { Request, Response } from 'express';
import * as garcomModel from '../models/edidoratoModel';

export async function getPedidoprato(req: Request, res: Response) {
    try {
      const pedidoprato = await pedidopratoModel.getPedidoprato();
      res.json(pedidoprato);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar os pedidos das mesas' });
    }
}
