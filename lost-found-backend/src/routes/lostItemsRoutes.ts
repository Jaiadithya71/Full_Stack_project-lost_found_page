  // src/routes/lostItemsRoutes.ts
  import { Router, Request, Response, NextFunction } from 'express';
  import { db } from '../database/db';

  export const router = Router();

  router.post('/', async function (req: Request, res: Response): Promise<void> {
    const {
      item_name,
      category,
      description,
      last_seen_location,
      date_lost,
      contact_info,
    } = req.body;

    if (!item_name || !category || !description || !date_lost || !contact_info) {
      res.status(400).json({ error: 'Missing required fields.' });
      return;
    }

    try {
      const query = `
        INSERT INTO lost_items (
          item_name, category, description, last_seen_location, date_lost, contact_info
        ) VALUES (?, ?, ?, ?, ?, ?)
      `;

      await db.execute(query, [
        item_name,
        category,
        description,
        last_seen_location || null,
        date_lost,
        contact_info,
      ]);

      res.status(201).json({ message: 'Lost item reported successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error.' });
    }
  });

  router.get('/', async (_req: Request, res: Response) => {
    try {
      const [rows] = await db.query('SELECT * FROM lost_items ORDER BY created_at DESC');
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch lost items.' });
    }
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const [rows] = await db.query('SELECT * FROM lost_items WHERE id = ?', [id]);

      if (Array.isArray(rows) && rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).json({ error: 'Lost item not found.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error.' });
    }
  });

  router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const [result] = await db.query('DELETE FROM lost_items WHERE id = ?', [id]);

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

  export const updateLostItem = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const {
      item_name,
      category,
      description,
      last_seen_location,
      date_lost,
      contact_info,
    } = req.body;

    if (!item_name || !category || !description || !date_lost || !contact_info) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
      const query = `
        UPDATE lost_items SET
          item_name = ?, category = ?, description = ?, 
          last_seen_location = ?, date_lost = ?, contact_info = ?
        WHERE id = ?
      `;

      const [result] = await db.query(query, [
        item_name,
        category,
        description,
        last_seen_location || null,
        date_lost,
        contact_info,
        id,
      ]);

      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ error: 'Lost item not found.' });
      }

      return res.status(200).json({ message: 'Item updated successfully.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error.' });
    }
  };

  router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateLostItem(req, res);
      console.log('Received data:', req.body);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  });

  // New SEARCH endpoint
  router.get('/search', async (req: Request, res: Response) => {
    console.log('LostItems search endpoint hit with query:', req.query); // Debug log
    const { category, date } = req.query;
  
    try {
      let query = 'SELECT * FROM lost_items';
      const params: any[] = [];
  
      const conditions = [];
      if (category) {
        conditions.push('category = ?');
        params.push(category);
        console.log('Applying category filter:', category); // Debug log
      }
      if (date) {
        conditions.push('DATE(date_lost) = ?');
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
      res.status(500).json({ error: 'Failed to search lost items.' });
    }
  });

  export default router;
