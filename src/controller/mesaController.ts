import { Request, Response } from 'express';
import * as mesaModel from '../models/mesaModel';

export async function getMesa(req: Request, res: Response) {
    try {
      const mesa = await mesaModel.getMesa();
      res.json(mesa);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar mesas' });
    }
  }

