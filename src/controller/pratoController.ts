import { Request, Response } from 'express';
import * as pratoModel from '../models/pratoModel.js';

export async function getPrato(req: Request, res: Response) {
  try {
    const prato = await pratoModel.getPrato();
    res.json(prato);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os pratos' });
  }
}