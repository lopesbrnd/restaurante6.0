var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as pedidopratoModel from '../models/pedidopratoModel.js';
export function getPedidoprato(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pedidoprato = yield pedidopratoModel.getPedidoprato();
            res.json(pedidoprato);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar os pedidos das mesas' });
        }
    });
}
export function criarPedidoprato(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pedido_id, prato_id, quantidade } = req.body;
        if (!pedido_id || !prato_id || !quantidade) {
            return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
        }
        try {
            const result = yield pedidopratoModel.criarPedidoprato(pedido_id, prato_id, quantidade);
            return res.status(201).json({ id: result.insertId });
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro ao criar pratos do pedido' });
        }
    });
}
// Controller para excluir o prato de um pedido
export function excluirPratoDoPedido(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pedido_id, prato_id } = req.params; // Obtém os parâmetros da URL
        // Valida se os parâmetros são números
        if (isNaN(Number(pedido_id)) || isNaN(Number(prato_id))) {
            res.status(400).json({ message: 'Parâmetros inválidos. Certifique-se de que os IDs sejam números.' });
            return;
        }
        try {
            const sucesso = yield pedidopratoModel.excluirPedidoPrato(Number(pedido_id), Number(prato_id));
            if (sucesso) {
                res.status(200).json({ message: 'Prato excluído do pedido com sucesso.' });
            }
            else {
                res.status(404).json({ message: 'Pedido ou prato não encontrado.' });
            }
        }
        catch (error) {
            console.error('Erro ao excluir prato do pedido:', error);
            res.status(500).json({ message: 'Erro ao excluir prato do pedido.' });
        }
    });
}
