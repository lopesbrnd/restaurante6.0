var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from 'dotenv';
import pool from './db.js';
dotenv.config();
export function getPedidos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute('SELECT * FROM Pedidos');
            return rows;
        }
        catch (error) {
            console.error('Erro ao obter pedidos:', error);
            throw new Error('Erro ao obter dados dos pedidos');
        }
    });
}
export function criarPedidos(cliente_id, mesa) {
    return __awaiter(this, void 0, void 0, function* () {
        // Verifique se algum valor é inválido antes de tentar inserir no banco
        if (!cliente_id || !mesa) {
            throw new Error('Campos obrigatórios não preenchidos');
        }
        try {
            const [result] = yield pool.execute('INSERT INTO pedidos (cliente_id, mesa) VALUES (?, ?)', [cliente_id, mesa]);
            const insertId = result.insertId;
            return { insertId };
        }
        catch (error) {
            console.error('Erro ao criar pedido:', error);
            throw new Error('Erro ao inserir dados do pedido');
        }
    });
}
export function excluirPedido(pedidoId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result] = yield pool.execute('DELETE FROM pedidos WHERE id = ?', [pedidoId]);
            return result.affectedRows > 0;
        }
        catch (error) {
            console.error('Erro ao excluir pedido:', error);
            throw new Error('Erro ao excluir o pedido');
        }
    });
}
