import express from 'express';
import * as pratoController from '../controller/pratoController.js';

const router = express.Router();

router.get('/', pratoController.getPrato);

export default router;
