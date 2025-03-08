import dotenv from 'dotenv';
import mysql, { ResultSetHeader } from 'mysql2/promise';
import pool from './db.js';

dotenv.config();

// Criação da conexão com o banco de dados

export async function getGarcom() {
  try {
    const [rows] = await pool.execute('SELECT * FROM garcom');
    return rows;
  } catch (error) {
    console.error('Erro ao obter garcons:', error);
    throw new Error('Erro ao obter dados dos garcons');
  }
}