import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
    animeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime', required: true },
    number: { type: Number, required: true },
    title: { type: String },
    sources: [{
        language: { type: String, required: true }, // e.g., 'English', 'Tamil'
        url: { type: String, required: true }
    }],
    views: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Episode', episodeSchema);
