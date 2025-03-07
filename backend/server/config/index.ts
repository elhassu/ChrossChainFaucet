import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('Missing MONGO_URI in environment');
}

export default {
  MONGO_URI,
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
};