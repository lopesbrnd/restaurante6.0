import { Request, Response } from 'express';
import * as garcomModel from '../models/garcomModel';

// Função para obter os alunos
export async function getGarcom(req: Request, res: Response) {
    try {
      const garcom = await garcomModel.getGarcom();
      res.json(garcom);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar garcons' });
    }
}
