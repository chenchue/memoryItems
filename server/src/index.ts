import express from 'express';
import { addItem, getAllItems } from './data/items';
import cors from 'cors';

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
