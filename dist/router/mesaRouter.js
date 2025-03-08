import express from 'express';
import * as mesaController from '../controller/mesaController.js';
import { atualizarDisponibilidadeMesa } from '../controller/mesaController.js';
const router = express.Router();
router.get('/', mesaController.getMesa);
router.patch('/:mesaId', atualizarDisponibilidadeMesa);
export default router;
