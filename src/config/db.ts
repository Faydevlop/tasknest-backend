import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://fayfayis74:fayfayis74@urlshortner.57uau.mongodb.net/tasknest?retryWrites=true&w=majority&appName=urlshortner' ;

const connectDB = async()=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log('MongoDB connected');
    } catch (error:any) {
        console.error('MongoDB connection error:', error.message);
    process.exit(1);
    }
}

export default connectDB