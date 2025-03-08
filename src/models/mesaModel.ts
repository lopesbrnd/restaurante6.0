import mysql, { ResultSetHeader } from 'mysql2/promise';// Usando a versão promise do mysql2
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

// Criação da conexão com o banco de dados


export async function getMesa() {
  try {
    const [rows] = await pool.execute('SELECT * FROM mesa');
    return rows;
  } catch (error) {
    console.error('Erro ao obter mesas:', error);
    throw new Error('Erro ao obter dados das mesas');
  }
}


  export async function atualizarDisponibilidadeMesa(mesaId: number, disponibilidade: number): Promise<boolean> {
    try {
      const [result] = await pool.execute(
        'UPDATE mesa SET disponibilidade = ? WHERE id = ?',
        [disponibilidade, mesaId]
      );
      return (result as mysql.ResultSetHeader).affectedRows > 0;
    } catch (error) {
      console.error('Erro ao atualizar a mesa:', error);
      throw new Error('Erro ao atualizar a disponibilidade da mesa');
    }
  }

