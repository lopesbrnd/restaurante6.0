import express from 'express';
import * as clienteController from '../controller/clienteController.js';

const router = express.Router();

router.get('/', clienteController.getCliente);
router.post('/', clienteController.criarCliente);

export default router;
