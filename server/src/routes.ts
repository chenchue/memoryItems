import { addItem, editItem, getAllItems } from './data/items';
import { validateBooleanQueryParam, validateNumberParam } from './middlewares/middlewares';
import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();


router.get('/', (req: Request, res: Response) => {
  console.log('root route hit');
  res.send('Server is running');
});


router.get('/items', (req: Request, res: Response) => {
  try {

    res.json(getAllItems());// question to gpt: does it make more sense to do the try catch here or in the handler, I think its unnecessary to do in both
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/items', (req: Request, res: Response) => {
  try {
    const newItem = addItem(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: 'Invalid item data' });
  }
});

router.patch('/item/:itemId', validateNumberParam('itemId'), validateBooleanQueryParam('isFavourite'), (req, res) => {
  try {
    const itemId = req.validatedNumber;
    const isFavourite: boolean = req.validatedBoolean;
    const newItem = editItem(itemId, isFavourite);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: 'Invalid item data' });
  }
});


export default router;