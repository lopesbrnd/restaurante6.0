import mysql from 'mysql2/promise'; // Usando a versão promise do mysql2
import dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';
import pool from './db';

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

export async function criarPrato(
    nome: string,
    quantidade:number,
    preco:number,
    descricao:string
  ) {
    // Verifique se algum valor é inválido antes de tentar inserir no banco
    if (!nome || !quantidade || !preco || !descricao) {
      throw new Error('Campos obrigatórios não preenchidos');
    }
  
    try {
      const [result] = await pool.execute(
        'INSERT INTO cliente (nome, quantidade, preco, descricao) VALUES (?, ?, ?, ?)',
        [nome, quantidade, preco, descricao]
      );
  
      const insertId = (result as ResultSetHeader).insertId;
      return { insertId }; 
    } catch (error) {
      console.error('Erro ao criar prato:', error);
      throw new Error('Erro ao inserir dados do prato');
    }
    }
