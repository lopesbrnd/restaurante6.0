import express from 'express';
import * as garcomController from '../controller/garcomController.js';
const router = express.Router();
router.get('/', garcomController.getGarcom);
export default router;
