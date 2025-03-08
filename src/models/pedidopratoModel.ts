import mysql, { ResultSetHeader } from 'mysql2/promise'; // Usando a versão promise do mysql2
import dotenv from 'dotenv';

dotenv.config();

// Criação da conexão com o banco de dados
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

export async function getPedidoprato() {
  try {
    const [rows] = await pool.execute('SELECT * FROM pedidoprato');
    return rows;
  } catch (error) {
    console.error('Erro ao obter pratos do pedido:', error);
    throw new Error('Erro ao obter dados do(s) pratos do pedido');
  }
}

export async function criarPedidoprato(
  pedido_id:number,
  prato_id:number,
  quantidade:number
) {
  // Verifique se algum valor é inválido antes de tentar inserir no banco
  if (!pedido_id || !prato_id || !quantidade) {
    throw new Error('Campos obrigatórios não preenchidos');
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO pedidoprato (pedido_id,prato_id, quantidade) VALUES (?, ?,?)',
      [pedido_id,prato_id,quantidade]
    );

    const insertId = (result as ResultSetHeader).insertId;
    return { insertId }; // Retorna o ID do prato do pedido inserido
  } catch (error) {
    console.error('Erro ao criar pratos do pedido:', error);
    throw new Error('Erro ao inserir dados do prato do pedido');
  }
  }

export async function excluirPedidoPrato(pedido_id: number, prato_id: number): Promise<boolean> { 
  try {
    // A consulta DELETE foi modificada para excluir pelo pedido_id e prato_id
    const [result] = await pool.execute(
      'DELETE FROM pedidoprato WHERE pedido_id = ? AND prato_id = ?', 
      [pedido_id, prato_id]
    );

    // Verifica se a exclusão foi bem-sucedida
    return (result as mysql.ResultSetHeader).affectedRows > 0;
  } catch (error) {
    console.error('Erro ao excluir pedido e prato:', error);
    throw new Error('Erro ao excluir o pedido e prato');
  }
}