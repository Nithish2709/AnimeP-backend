import express from 'express';
import { addEpisode, getEpisodeById, deleteEpisode } from '../controllers/episodeController.js';

import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, verifyAdmin, addEpisode);
router.get('/:id', getEpisodeById);
router.delete('/:id', verifyToken, verifyAdmin, deleteEpisode);

export default router;
