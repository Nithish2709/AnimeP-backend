import express from 'express';
import { getAllAnime, getAnimeById, createAnime, updateAnime, deleteAnime, getRecentlyUpdatedAnime, rateAnime } from '../controllers/animeController.js';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllAnime);
router.get('/recent', getRecentlyUpdatedAnime);
router.get('/:id', getAnimeById);
router.post('/', verifyToken, verifyAdmin, createAnime);
router.put('/:id', verifyToken, verifyAdmin, updateAnime);
router.delete('/:id', verifyToken, verifyAdmin, deleteAnime);
router.post('/rate', verifyToken, rateAnime);

export default router;
