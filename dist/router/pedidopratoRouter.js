import express from 'express';
import * as pedidopratoController from '../controller/pedidopratoController.js';
import { excluirPratoDoPedido } from '../controller/pedidopratoController.js';
const router = express.Router();
router.get('/', pedidopratoController.getPedidoprato);
router.post('/', pedidopratoController.criarPedidoprato);
router.delete('/pedidos/:pedido_id/pratos/:prato_id', excluirPratoDoPedido);
export default router;
