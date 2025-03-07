// server/server.ts
import express from 'express';
import next from 'next';
import mongoose from 'mongoose';
import config from './config';
import { faucetRouter } from './routes/faucet.router';
import { errorHandler } from './utils/error-handler.util';

(async () => {
  try {
    // 1. Prepare Next.js
    const dev = config.NODE_ENV !== 'production';

    const nextApp = next({ dev });
    await nextApp.prepare();

    // 2. Connect to MongoDB
    await mongoose.connect(config.MONGO_URI);
    console.log('Connected to MongoDB');

    // 3. Create Express server
    const server = express();

    // 4. Global middlewares
    server.use(express.json());
    server.use(errorHandler);

    // 5. Define routes
    server.use('/faucet', faucetRouter(nextApp));
    // pass nextApp if you need it, or just use it directly in server.all('*')

    // 6. Next.js catch-all route
    server.all('*', (req, res) => nextApp.getRequestHandler()(req, res));

    // 7. Global error handler
    server.use(errorHandler);

    // 8. Start listening
    server.listen(config.PORT, () => {
      console.log(`> Server ready on http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
})();