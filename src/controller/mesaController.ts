import { Request, Response } from 'express';
import * as mesaModel from '../models/mesaModel.js';

export async function getMesa(req: Request, res: Response) {
    try {
      const mesa = await mesaModel.getMesa();
      res.json(mesa);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar mesas' });
    }
  }


  export async function atualizarDisponibilidadeMesa(req: Request, res: Response): Promise<void> {
    const mesaId = parseInt(req.params.mesaId);
    const { disponibilidade } = req.body;
  
    if (isNaN(mesaId) || typeof disponibilidade !== 'number') {
      res.status(400).json({ message: 'Parâmetros inválidos.' });
      return;
    }
  
    try {
      const sucesso = await mesaModel.atualizarDisponibilidadeMesa(mesaId, disponibilidade);
      if (sucesso) {
        res.status(200).json({ message: 'Mesa atualizada com sucesso.' });
      } else {
        res.status(404).json({ message: 'Mesa não encontrada.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar a mesa.', error });
    }
  }