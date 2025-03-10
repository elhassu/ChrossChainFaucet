// server/server.ts
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './server/config/config';
import { faucetRouter } from './server/routes/faucet-router';
import { errorHandler } from './server/utils/error-handler-util';

(async () => {
  try {

    // 1. Connect to MongoDB
    await mongoose.connect(config.MONGO_URI);
    console.log('Connected to MongoDB: ',mongoose.connection.readyState);

    // 2. Create Express server
    const server = express();

    // 3. Global middlewares
    server.use(cors())
    server.use(express.json());

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