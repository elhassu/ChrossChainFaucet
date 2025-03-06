import express, { Request, Response } from 'express';
import next from 'next';

const dev: boolean = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * Async handler wrapper to catch errors from async route handlers
 * otherwise typescript will not be able to parse the errors
 *  preventing compilation
*/
function asyncHandler(fn: express.RequestHandler): express.RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

app.prepare().then(() => {
  const server = express();

  // Middleware to parse JSON bodies
  server.use(express.json());

  // Express API route for the faucet endpoint
  server.post('/faucet', asyncHandler(async (req: Request, res: Response) => {
    res.status(501).json({ error: 'Not Implemented' });
  }));

  // Handle all other routes with Next.js
  // (type annotations removed to avoid type conflicts)
  server.all('*', (req, res) => handle(req, res));

  const PORT: string | number = process.env.PORT || 3000;
  server.listen(PORT, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
