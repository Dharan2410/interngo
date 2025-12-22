import express from 'express';
import {getmetrics,createUpdateMetrics,deleteMetrics} from './metrics_controller.js';

const router = express.Router();

router.get('/metrics', getmetrics);
router.post('/metrics/:id', createUpdateMetrics);
router.delete('/metrics/:id', deleteMetrics)

export default router;
