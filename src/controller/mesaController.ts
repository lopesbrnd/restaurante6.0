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

  export async function criarMesa(req: Request, res: Response): Promise<any> {
    const { nome, numero } = req.body;
    if (!nome || !numero) {
      return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); 
    }
  
    try {
      const result = await mesaModel.criarMesa(nome, numero);
      return res.status(201).json({ id: result.insertId }); 
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar mesa' }); 
    }
    }
