import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';
import pool from './db';


dotenv.config();

export async function getClientes() {
    try {
        const [rows] = await pool.execute('SELECT * FROM cliente');
        return rows;
    } catch (error) {
        console.error('Erro ao obter clientes:', error);
        throw new Error('Erro ao obter dados dos clientes');
    }
}

export async function criarCliente(
  nome: string,
  numero:string
) {
  // Verifique se algum valor é inválido antes de tentar inserir no banco
  if (!nome || !numero) {
    throw new Error('Campos obrigatórios não preenchidos');
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO cliente (nome, numero) VALUES (?, ?)',
      [nome, numero]
    );

    const insertId = (result as ResultSetHeader).insertId;
    return { insertId }; 
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw new Error('Erro ao inserir dados do cliente');
  }
  }
