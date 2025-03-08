import express from 'express';
import { excluirPedido } from '../controller/pedidosController.js';
import * as pedidosController from '../controller/pedidosController.js';
const router = express.Router();
router.delete('/:pedidoId', excluirPedido);
router.get('/', pedidosController.getPedidos);
router.post('/', pedidosController.criarPedidos);
export default router;
