import express from 'express';
import * as pedidosController from '../controller/pedidosController';

const router = express.Router();

router.get('/', pedidosController.getPedidos);
router.post('/', pedidosController.criarPedidos);

export default router;
