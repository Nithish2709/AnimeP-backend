import mongoose from 'mongoose';

const mangaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String },
    genres: [{ type: String }],
    status: { type: String, enum: ['Ongoing', 'Completed', 'Hiatus'], default: 'Ongoing' },
    author: { type: String },
    ratings: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        value: { type: Number, min: 1, max: 5 }
    }],
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }]
}, { timestamps: true });

export default mongoose.model('Manga', mangaSchema);
