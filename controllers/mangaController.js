import Manga from '../models/Manga.js';

export const getAllManga = async (req, res) => {
    try {
        const { search, genre } = req.query;
        let query = {};
        if (search) query.title = { $regex: search, $options: 'i' };
        if (genre) query.genres = genre;

        const mangas = await Manga.find(query).sort({ createdAt: -1 });
        res.json(mangas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRecentlyUpdatedManga = async (req, res) => {
    try {
        const mangas = await Manga.find().sort({ updatedAt: -1 }).limit(10);
        res.json(mangas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const rateManga = async (req, res) => {
    try {
        const { mangaId, rating } = req.body;
        const manga = await Manga.findById(mangaId);
        if (!manga) return res.status(404).json({ message: 'Manga not found' });

        const existingRating = manga.ratings.find(r => r.userId.toString() === req.user._id.toString());
        if (existingRating) {
            existingRating.value = rating;
        } else {
            manga.ratings.push({ userId: req.user._id, value: rating });
        }
        await manga.save();
        res.json({ message: 'Rating updated', ratings: manga.ratings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMangaById = async (req, res) => {
    try {
        const manga = await Manga.findById(req.params.id).populate('chapters');
        if (!manga) return res.status(404).json({ message: 'Manga not found' });
        res.json(manga);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createManga = async (req, res) => {
    try {
        const newManga = new Manga(req.body);
        await newManga.save();
        res.status(201).json(newManga);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateManga = async (req, res) => {
    try {
        const updatedManga = await Manga.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedManga);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteManga = async (req, res) => {
    try {
        await Manga.findByIdAndDelete(req.params.id);
        res.json({ message: 'Manga deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
