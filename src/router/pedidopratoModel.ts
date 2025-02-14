import express from 'express';
import * as pedidopratoController from '../controller/pedidopratoController';

const router = express.Router();

router.get('/', pedidopratoController.getPedidoprato);
router.post('/', pedidopratoController.criarPedidoprato);

export default router;
