import express from 'express';
import { addItem, editItem, getAllItems } from './data/items';
import cors from 'cors';
import { validateBooleanQueryParam, validateNumberParam } from './middlewares/middlewares';
import { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error('Unhandled error:', err.message);
//   res.status(500).json({ error: 'Something went wrong' });
// });


app.get('/', (req, res) => {
  console.log('⚡ root route hit');
  res.send('Server is running');
});


app.get('/items', (req, res) => {
  res.json(getAllItems());
});

app.post('/items', (req, res) => {
  try {
    const newItem = addItem(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: 'Invalid item data' });
  }
});

app.patch('/item/:itemId', validateNumberParam('itemId'), validateBooleanQueryParam('isFavourite'), (req, res) => {
  try {
    const itemId = req.validatedNumber;
    const isFavourite: boolean = req.validatedBoolean;
    const newItem = editItem(itemId, isFavourite);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: 'Invalid item data' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
