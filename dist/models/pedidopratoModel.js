var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mysql from 'mysql2/promise'; // Usando a versão promise do mysql2
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
export function getPedidoprato() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute('SELECT * FROM pedidoprato');
            return rows;
        }
        catch (error) {
            console.error('Erro ao obter pratos do pedido:', error);
            throw new Error('Erro ao obter dados do(s) pratos do pedido');
        }
    });
}
export function criarPedidoprato(pedido_id, prato_id, quantidade) {
    return __awaiter(this, void 0, void 0, function* () {
        // Verifique se algum valor é inválido antes de tentar inserir no banco
        if (!pedido_id || !prato_id || !quantidade) {
            throw new Error('Campos obrigatórios não preenchidos');
        }
        try {
            const [result] = yield pool.execute('INSERT INTO pedidoprato (pedido_id,prato_id, quantidade) VALUES (?, ?,?)', [pedido_id, prato_id, quantidade]);
            const insertId = result.insertId;
            return { insertId }; // Retorna o ID do prato do pedido inserido
        }
        catch (error) {
            console.error('Erro ao criar pratos do pedido:', error);
            throw new Error('Erro ao inserir dados do prato do pedido');
        }
    });
}
export function excluirPedidoPrato(pedido_id, prato_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // A consulta DELETE foi modificada para excluir pelo pedido_id e prato_id
            const [result] = yield pool.execute('DELETE FROM pedidoprato WHERE pedido_id = ? AND prato_id = ?', [pedido_id, prato_id]);
            // Verifica se a exclusão foi bem-sucedida
            return result.affectedRows > 0;
        }
        catch (error) {
            console.error('Erro ao excluir pedido e prato:', error);
            throw new Error('Erro ao excluir o pedido e prato');
        }
    });
}
