import express from 'express';
import { addChapter, getChapterById, deleteChapter } from '../controllers/chapterController.js';

import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, verifyAdmin, addChapter);
router.get('/:id', getChapterById);
router.delete('/:id', verifyToken, verifyAdmin, deleteChapter);

export default router;
