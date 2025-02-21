import mysql, { ResultSetHeader } from 'mysql2/promise'; // Usando a versão promise do mysql2
import dotenv from 'dotenv';
import pool from './db';

dotenv.config();

// Criação da conexão com o banco de dados


interface Cliente {
  id: number;
  nome: string;
  email: string;
}

interface Prato {
  id: number;
  nome: string;
  preco: number;
}
export async function getPedidos() {
  try {
    const [rows] = await pool.execute('SELECT * FROM Pedidos');
    return rows;
  } catch (error) {
    console.error('Erro ao obter pedidos:', error);
    throw new Error('Erro ao obter dados dos pedidos');
  }
}

export async function criarPedidos(
  cliente: Cliente,
  prato: Prato[]
) {
  // Verifique se algum valor é inválido antes de tentar inserir no banco
  if (!cliente || !prato) {
    throw new Error('Campos obrigatórios não preenchidos');
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO cliente (cliente, prato) VALUES (?, ?)',
      [cliente, prato]
    );

    const insertId = (result as ResultSetHeader).insertId;
    return { insertId }; 
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw new Error('Erro ao inserir dados do pedido');
  }
  }

