import Chapter from '../models/Chapter.js';
import Manga from '../models/Manga.js';

export const addChapter = async (req, res) => {
    try {
        const { mangaId } = req.body;
        const newChapter = new Chapter(req.body);
        await newChapter.save();

        await Manga.findByIdAndUpdate(mangaId, {
            $push: { chapters: newChapter._id },
            updatedAt: new Date()
        });

        res.status(201).json(newChapter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getChapterById = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id);
        if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
        res.json(chapter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteChapter = async (req, res) => {
    try {
        await Chapter.findByIdAndDelete(req.params.id);
        res.json({ message: 'Chapter deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
