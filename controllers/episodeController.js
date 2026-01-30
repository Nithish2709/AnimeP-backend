import Episode from '../models/Episode.js';
import Anime from '../models/Anime.js';

export const addEpisode = async (req, res) => {
    try {
        const { animeId, sources } = req.body;
        const newEpisode = new Episode(req.body);
        await newEpisode.save();

        await Anime.findByIdAndUpdate(animeId, {
            $push: { episodes: newEpisode._id },
            updatedAt: new Date()
        });

        res.status(201).json(newEpisode);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEpisodeById = async (req, res) => {
    try {
        const episode = await Episode.findById(req.params.id);
        if (!episode) return res.status(404).json({ message: 'Episode not found' });
        res.json(episode);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteEpisode = async (req, res) => {
    try {
        await Episode.findByIdAndDelete(req.params.id);
        res.json({ message: 'Episode deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
