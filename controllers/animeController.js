import Anime from '../models/Anime.js';

export const getAllAnime = async (req, res) => {
    try {
        const { search, genre } = req.query;
        let query = {};
        if (search) query.title = { $regex: search, $options: 'i' };
        if (genre) query.genres = genre;

        const animes = await Anime.find(query).sort({ createdAt: -1 });
        res.json(animes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRecentlyUpdatedAnime = async (req, res) => {
    try {
        const animes = await Anime.find().sort({ updatedAt: -1 }).limit(10);
        res.json(animes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const rateAnime = async (req, res) => {
    try {
        const { animeId, rating } = req.body;
        const anime = await Anime.findById(animeId);
        if (!anime) return res.status(404).json({ message: 'Anime not found' });

        const existingRating = anime.ratings.find(r => r.userId.toString() === req.user._id.toString());
        if (existingRating) {
            existingRating.value = rating;
        } else {
            anime.ratings.push({ userId: req.user._id, value: rating });
        }
        await anime.save();
        res.json({ message: 'Rating updated', ratings: anime.ratings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAnimeById = async (req, res) => {
    try {
        const anime = await Anime.findById(req.params.id).populate('episodes');
        if (!anime) return res.status(404).json({ message: 'Anime not found' });
        res.json(anime);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createAnime = async (req, res) => {
    try {
        console.log('Received Create Anime Request:', req.body);
        console.log('User:', req.user);
        const newAnime = new Anime(req.body);
        const savedAnime = await newAnime.save();
        console.log('Anime Saved to DB:', savedAnime);
        res.status(201).json(savedAnime);
    } catch (error) {
        console.error('Error creating anime:', error);
        res.status(500).json({ error: error.message });
    }
};

export const updateAnime = async (req, res) => {
    try {
        const updatedAnime = await Anime.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAnime);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteAnime = async (req, res) => {
    try {
        await Anime.findByIdAndDelete(req.params.id);
        res.json({ message: 'Anime deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
