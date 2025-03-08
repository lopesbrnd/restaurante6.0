import express from 'express';
import * as clienteController from '../controller/clienteController.js';
import { excluirCliente } from '../controller/clienteController.js';

const router = express.Router();

router.get('/', clienteController.getCliente);
router.post('/', clienteController.criarCliente);
router.delete('/:id_cliente',excluirCliente)

export default router;
