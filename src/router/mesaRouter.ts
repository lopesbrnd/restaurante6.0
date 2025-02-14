import express from 'express';
import * as mesaController from '../controller/mesaController';

const router = express.Router();

router.get('/', mesaController.getMesa);router.post

export default router;
