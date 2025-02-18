import express from 'express';
import * as pedidosController from '../controller/pedidosController.js';
const router = express.Router();
router.get('/', pedidosController.getPedidos);
router.post('/', pedidosController.criarPedidos);
export default router;
