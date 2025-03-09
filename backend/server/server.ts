// server/server.ts
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import { faucetRouter } from './routes/faucet.router';
import { errorHandler } from './utils/error-handler.util';

(async () => {
  try {

    // 1. Connect to MongoDB
    await mongoose.connect(config.MONGO_URI);
    console.log('Connected to MongoDB');

    // 2. Create Express server
    const server = express();

    // 3. Global middlewares
    server.use(express.json());
    server.use(errorHandler);

    // 4. Define routes
    server.use('/faucet', faucetRouter);

    // 5. Global error handler
    server.use(errorHandler);

    // 6. Start listening
    server.listen(config.PORT, () => {
      console.log(`> Server ready on http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
})();