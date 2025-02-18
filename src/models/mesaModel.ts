import mysql, { ResultSetHeader } from 'mysql2/promise';// Usando a versão promise do mysql2
import dotenv from 'dotenv';
import pool from './db';

dotenv.config();

// Criação da conexão com o banco de dados


export async function getMesa() {
  try {
    const [rows] = await pool.execute('SELECT * FROM Mesa');
    return rows;
  } catch (error) {
    console.error('Erro ao obter mesas:', error);
    throw new Error('Erro ao obter dados das mesas');
  }
}

export async function criarMesa(
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
    return { insertId }; // Retorna o ID da mesa inserida 
  } catch (error) {
    console.error('Erro ao criar mesa:', error);
    throw new Error('Erro ao inserir dados da mesa');
  }
  }

