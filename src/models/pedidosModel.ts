import mysql, { ResultSetHeader } from 'mysql2/promise'; // Usando a versão promise do mysql2
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

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
  cliente_id:number,
  mesa:number
) {
  // Verifique se algum valor é inválido antes de tentar inserir no banco
  if (!cliente_id || !mesa) {
    throw new Error('Campos obrigatórios não preenchidos');
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO pedidos (cliente_id, mesa) VALUES (?, ?)',
      [cliente_id, mesa]
    );

    const insertId = (result as ResultSetHeader).insertId;
    return { insertId }; 
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw new Error('Erro ao inserir dados do pedido');
  }
  }

