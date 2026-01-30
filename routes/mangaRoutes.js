import express from 'express';
import { getAllManga, getMangaById, createManga, updateManga, deleteManga, getRecentlyUpdatedManga, rateManga } from '../controllers/mangaController.js';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllManga);
router.get('/recent', getRecentlyUpdatedManga);
router.get('/:id', getMangaById);
router.post('/', verifyToken, verifyAdmin, createManga);
router.put('/:id', verifyToken, verifyAdmin, updateManga);
router.delete('/:id', verifyToken, verifyAdmin, deleteManga);
router.post('/rate', verifyToken, rateManga);

export default router;
