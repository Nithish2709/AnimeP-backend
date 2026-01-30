import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow frontend
    credentials: true
}));
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
import authRoutes from './routes/authRoutes.js';
import animeRoutes from './routes/animeRoutes.js';
import episodeRoutes from './routes/episodeRoutes.js';
import mangaRoutes from './routes/mangaRoutes.js';
import chapterRoutes from './routes/chapterRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/anime', animeRoutes);
app.use('/api/episodes', episodeRoutes);
app.use('/api/manga', mangaRoutes);
app.use('/api/chapters', chapterRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
