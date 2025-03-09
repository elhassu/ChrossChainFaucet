import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('Missing MONGO_URI in environment');
}

export default {
  MONGO_URI,
  VALIDATOR_ADDRESS: "cosmosvaloper124maqmcqv8tquy764ktz7cu0gxnzfw54n3vww8",
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
};