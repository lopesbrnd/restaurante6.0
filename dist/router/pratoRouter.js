import express from 'express';
import * as pratoController from '../controller/pratoController.js';
const router = express.Router();
router.get('/', pratoController.getPrato);
router.post('/', pratoController.criarPrato);
export default router;
