import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
    mangaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true },
    number: { type: Number, required: true },
    title: { type: String },
    content: [{ type: String }], // Array of image URLs for pages
    pdfUrl: { type: String }, // Optional PDF link
}, { timestamps: true });

export default mongoose.model('Chapter', chapterSchema);
