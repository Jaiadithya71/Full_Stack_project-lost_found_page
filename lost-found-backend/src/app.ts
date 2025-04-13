import express from 'express';
import lostItemsRoutes from './routes/lostItemsRoutes';
import foundItemsRoutes from './routes/foundItemsRoutes';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json()); // ✅ MUST be before routes

app.use('/api/lost-items', lostItemsRoutes); // ✅ Route should be prefixed
app.use('/api/found-items', foundItemsRoutes);

export default app;
