import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../database/db';

export const router = Router();

// POST /api/found-items - Report a found item
router.post('/', async function (req: Request, res: Response): Promise<void> {
  console.log('POST endpoint hit with body:', req.body);
  const {
    item_name,
    category,
    description,
    found_location,
    date_found,
    contact_info,
  } = req.body;

  if (!item_name || !category || !description || !date_found || !contact_info) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  try {
    // Extract date portion from ISO string to match DATE column
    const dateOnly = new Date(date_found).toISOString().split('T')[0];

    const query = `
      INSERT INTO Found_Items (
        item_name, category, description, found_location, date_found, contact_info, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    await db.execute(query, [
      item_name,
      category,
      description,
      found_location || null,
      dateOnly,
      contact_info,
    ]);

    res.status(201).json({ message: 'Found item reported successfully.' });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Database error.' });
  }
});

// GET /api/found-items - View all found items
router.get('/', async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM Found_Items ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch found items.' });
  }
});

// GET /api/found-items/:id - Detail view of a found item
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM Found_Items WHERE id = ?', [id]);

    if (Array.isArray(rows) && rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: 'Found item not found.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error.' });
  }
});

// DELETE /api/found-items/:id - Delete a found item
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM Found_Items WHERE id = ?', [id]);

    if ((result as any).affectedRows > 0) {
      res.status(200).json({ message: 'Item deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Item not found.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete item.' });
  }
});

// PUT /api/found-items/:id - Edit a found item
export const updateFoundItem = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const {
    item_name,
    category,
    description,
    found_location,
    date_found,
    contact_info,
  } = req.body;

  if (!item_name || !category || !description || !found_location || !date_found || !contact_info) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const query = `
      UPDATE Found_Items SET
        item_name = ?, category = ?, description = ?, 
        found_location = ?, date_found = ?, contact_info = ?
      WHERE id = ?
    `;

    const [result] = await db.query(query, [
      item_name,
      category,
      description,
      found_location,
      date_found,
      contact_info,
      id,
    ]);

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Found item not found.' });
    }

    return res.status(200).json({ message: 'Item updated successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error.' });
  }
};

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateFoundItem(req, res);
    console.log('Received data:', req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

console.log('FoundItemsRouter loaded'); // Global debug log

// ... (other routes remain unchanged)

router.get('/search', async (req: Request, res: Response) => {
  console.log('FoundItems search endpoint hit with query:', req.query); // Debug log
  const { category, date } = req.query;

  try {
    let query = 'SELECT * FROM Found_Items';
    const params: any[] = [];

    const conditions = [];
    if (category) {
      conditions.push('category = ?');
      params.push(category);
      console.log('Applying category filter:', category); // Debug log
    }
    if (date) {
      conditions.push('DATE(date_found) = ?');
      params.push(date);
      console.log('Applying date filter:', date); // Debug log
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    console.log('Executing query:', query, 'with params:', params); // Debug log
    const [rows] = await db.query(query, params); 
    console.log('Query result rows:', rows); // Debug log

    res.status(200).json(rows);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Failed to search found items.' });
  }
});

export default router;