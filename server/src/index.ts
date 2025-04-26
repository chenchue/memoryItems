import express from 'express';
import { addItem, editItem, getAllItems } from './data/items';
import cors from 'cors';
import { validateBooleanQueryParam, validateNumberParam } from './middlewares/middlewares';
import { Request, Response, NextFunction } from 'express';
import itemsRouter from './routes';

const app = express();
const PORT = 3001;

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/', itemsRouter);


// ERROR HANDLER
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Something went wrong' });
});

// SERVER
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
