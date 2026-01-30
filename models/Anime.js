import mongoose from 'mongoose';

const animeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String }, // URL to image
    bannerImage: { type: String }, // URL to banner
    genres: [{ type: String }],
    status: { type: String, enum: ['Ongoing', 'Completed', 'Upcoming'], default: 'Ongoing' },
    ratings: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        value: { type: Number, min: 1, max: 5 }
    }],
    releaseYear: { type: Number },
    episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }]
}, { timestamps: true });

export default mongoose.model('Anime', animeSchema);
