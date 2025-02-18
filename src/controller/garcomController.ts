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
 
export async function criarGarcom(req: Request, res: Response): Promise<any> {
  const { nome, disponibilidade, taxa} = req.body;
  if (!nome || !disponibilidade || !taxa) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); 
  }

  try {
    const result = await garcomModel.criarGarcom(nome, disponibilidade, taxa);
    return res.status(201).json({ id: result.insertId }); 
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar garcom' }); 
  }
  }
