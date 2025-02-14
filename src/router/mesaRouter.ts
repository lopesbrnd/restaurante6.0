import express from 'express';
import * as mesaController from '../controller/mesaController';

const router = express.Router();

router.get('/', mesaController.getMesa);

export default router;
