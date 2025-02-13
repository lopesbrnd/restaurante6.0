import express from 'express';
import * as clienteController from '../controller/clienteController';

const router = express.Router();

router.get('/', clienteController.getCliente);
router.post('/', clienteController.criarCliente);

export default router;
