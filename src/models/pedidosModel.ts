import mysql from 'mysql2/promise'; // Usando a versão promise do mysql2
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
    return { insertId }; // Retorna o ID do aluno inserido
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw new Error('Erro ao inserir dados do pedido');
  }
  }

