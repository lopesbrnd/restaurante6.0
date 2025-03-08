import mysql from 'mysql2/promise'; // Usando a versão promise do mysql2
import dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';
import pool from './db.js';

dotenv.config();

// Criação da conexão com o banco de dados

export async function getPrato() {
  try {
    const [rows] = await pool.execute('SELECT * FROM prato');
    return rows;
  } catch (error) {
    console.error('Erro ao obter pratos:', error);
    throw new Error('Erro ao obter dados dos pratos');
  }
}