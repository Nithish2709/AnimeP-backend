import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Anime from './models/Anime.js';
import Episode from './models/Episode.js';
import Manga from './models/Manga.js';
import Chapter from './models/Chapter.js';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        // Clear existing data
        await Anime.deleteMany({});
        await Episode.deleteMany({});
        await Manga.deleteMany({});
        await Chapter.deleteMany({});

        console.log('Cleared existing data');

        // Create Anime
        const animeData = [
            {
                title: 'Naruto Shippuden',
                description: 'Naruto Uzumaki wants to be the best ninja in the land.',
                coverImage: 'https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg',
                bannerImage: 'https://c4.wallpaperflare.com/wallpaper/787/854/424/naruto-shippuuden-uzumaki-naruto-japane-anime-wallpaper-preview.jpg',
                genres: ['Action', 'Adventure'],
                status: 'Completed',
                rating: 8.5,
                releaseYear: 2007
            },
            {
                title: 'One Piece',
                description: 'Monkey D. Luffy sets off on an adventure to find the legendary treasure One Piece.',
                coverImage: 'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_test.jpg',
                bannerImage: 'https://c4.wallpaperflare.com/wallpaper/535/513/575/one-piece-monkey-d-luffy-portgas-d-ace-sabo-wallpaper-preview.jpg',
                genres: ['Adventure', 'Comedy'],
                status: 'Ongoing',
                rating: 9.0,
                releaseYear: 1999
            },
            {
                title: 'Demon Slayer',
                description: 'Tanjiro Kamado becomes a demon slayer to avenge his family and cure his sister.',
                coverImage: 'https://upload.wikimedia.org/wikipedia/en/0/09/Demon_Slayer_-_Kimetsu_no_Yaiba%2C_volume_1.jpg',
                bannerImage: 'https://c4.wallpaperflare.com/wallpaper/325/256/795/anime-demon-slayer-kimetsu-no-yaiba-kamado-tanjir%C5%8D-agatsuma-zenitsu-hd-wallpaper-preview.jpg',
                genres: ['Action', 'Fantasy'],
                status: 'Ongoing',
                rating: 8.8,
                releaseYear: 2019
            }
        ];

        const createdAnime = await Anime.insertMany(animeData);
        console.log('Anime Seeded');

        // Create Episodes with YouTube links
        const episodesData = [
            // Naruto Episodes
            {
                animeId: createdAnime[0]._id,
                number: 1,
                title: 'Homecoming',
                videoUrl: 'https://www.youtube.com/embed/-G9BqkgZXRA' // Naruto trailer/clip example
            },
            {
                animeId: createdAnime[0]._id,
                number: 2,
                title: 'The Akatsuki Makes Its Move',
                videoUrl: 'https://www.youtube.com/embed/1WkXnC1dAAk'
            },
            // One Piece Episodes
            {
                animeId: createdAnime[1]._id,
                number: 1,
                title: 'I am Luffy! The Man Who Will Beqcome the Pirate King!',
                videoUrl: 'https://www.youtube.com/embed/AcSVkCNDlzg'
            },
            // Demon Slayer Episodes
            {
                animeId: createdAnime[2]._id,
                number: 1,
                title: 'Cruelty',
                videoUrl: 'https://www.youtube.com/embed/VQGCKyvzIM4'
            }
        ];

        const createdEpisodes = await Episode.insertMany(episodesData);

        // Link Episodes to Anime
        for (const ep of createdEpisodes) {
            await Anime.findByIdAndUpdate(ep.animeId, { $push: { episodes: ep._id } });
        }
        console.log('Episodes Seeded');

        // Create Manga (Optional Placeholder)
        const mangaData = [
            {
                title: 'Bleach',
                description: 'Ichigo Kurosaki obtains the powers of a Soul Reaper.',
                coverImage: 'https://upload.wikimedia.org/wikipedia/en/7/72/Bleach_vol_01.jpg',
                genres: ['Action', 'Supernatural'],
                status: 'Completed',
                author: 'Tite Kubo'
            }
        ];
        await Manga.insertMany(mangaData);
        console.log('Manga Seeded');

        console.log('Seeding Complete');
        process.exit();

    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
