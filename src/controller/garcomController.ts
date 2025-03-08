import { Request, Response } from 'express';
import * as garcomModel from '../models/garcomModel.js';

export async function getGarcom(req: Request, res: Response) {
    try {
      const garcom = await garcomModel.getGarcom();
      res.json(garcom);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar garcons' });
    }
}
