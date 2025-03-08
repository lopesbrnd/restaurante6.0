import { Request, Response } from 'express';
import * as clienteModel from '../models/clienteModel.js';

export async function getCliente(req: Request, res: Response) {
  try {
    const cliente = await clienteModel.getClientes();
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes' });
  }
}

export async function criarCliente(req: Request, res: Response): Promise<any> {
  const { nome, numero } = req.body;
  if (!nome || !numero) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); 
  }

  try {
    const result = await clienteModel.criarCliente(nome, numero);
    return res.status(201).json({ id: result.insertId }); 
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar cliente' }); 
  }
  }

  export async function excluirCliente(req: Request, res: Response): Promise<void> {
    const id_cliente = parseInt(req.params.id_cliente);
  
    if (isNaN(id_cliente)) {
      res.status(400).json({ message: 'ID de pedido inválido.' });
      return;
    }
  
    try {
      const sucesso = await clienteModel.excluirCliente(id_cliente)
  
      if (sucesso) {
        res.status(200).json({ message: 'Cliente excluído com sucesso.' });
      } else {
        res.status(404).json({ message: 'Cliente não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir cliente.', error});
    }
  }
