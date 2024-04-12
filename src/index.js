import mongoose from "mongoose";
import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config({
    path: './.env' // Specify the file extension .env
});

// export const DB_NAME = "Youtube";
// export const PORT = 8000;
// export const MONGODB_URL = "mongodb://ramnarayan:Ram@1234@cluster0.hk4ehir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

connectDB();
