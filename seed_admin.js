import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const hashedPassword = await bcrypt.hash('admin123', 10);

        const adminData = {
            username: 'SuperAdmin',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin',
            language: 'en'
        };

        // Upsert: Update if exists, Insert if not
        const admin = await User.findOneAndUpdate(
            { email: adminData.email },
            adminData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log('Admin User Ready:');
        console.log('Email:', admin.email);
        console.log('Password: admin123');
        console.log('Role:', admin.role);

    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
