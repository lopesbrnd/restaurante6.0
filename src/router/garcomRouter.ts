import express from 'express';
import * as garcomController from '../controller/garcomController';

const router = express.Router();

router.get('/', garcomController.getGarcom);
router.post('/', garcomController.criarGarcom);

export default router;
