import express from 'express';
import * as mesaController from '../controller/mesaController.js';

const router = express.Router();

router.get('/', mesaController.getMesa);
router.post('/', mesaController.criarMesa);

export default router;
