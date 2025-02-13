import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const connectToDB = async () => {
    try {
        await mongoose.connect(MONGO_URL , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.log('Unable to connect to MongoDB.', error);
        process.exit(1);
    }
}

export const connection = connectToDB;