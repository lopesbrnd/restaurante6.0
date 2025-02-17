import mysql, { ResultSetHeader } from 'mysql2/promise'; // Usando a versão promise do mysql2
import dotenv from 'dotenv';

dotenv.config();

// Criação da conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

export async function getPedidoprato() {
  try {
    const [rows] = await pool.execute('SELECT * FROM Pedidoprato');
    return rows;
  } catch (error) {
    console.error('Erro ao obter pratos do pedido:', error);
    throw new Error('Erro ao obter dados do(s) pratos do pedido');
  }
}

export async function criarPedidoprato(
  nome: string,
) {
  // Verifique se algum valor é inválido antes de tentar inserir no banco
  if (!nome || ) {
    throw new Error('Campos obrigatórios não preenchidos');
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO cliente (nome, numero) VALUES (?, ?)',
      [nome]
    );

    const insertId = (result as ResultSetHeader).insertId;
    return { insertId }; // Retorna o ID do aluno inserido
  } catch (error) {
    console.error('Erro ao criar pratos do pedido:', error);
    throw new Error('Erro ao inserir dados do prato do pedido');
  }
  }

