import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();

import { connectDB } from './src/config/db.js';
import { ingest } from './main.js';

const app = express();
app.use(cors())
app.use(express.json());

const inProgress = new Set();

app.post('/ingest', async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'missing query' });

  if (inProgress.has(query)) {
    return res.json({ status: 'already in progress', query });
  }

  inProgress.add(query);
  res.json({ status: 'started', query }); 

 try {
    const result = await ingest(query);
    console.log(`Background ingestion complete for "${query}":`, result);
  } catch (err) {
    console.error(`Background ingestion failed for "${query}":`, err);
  } finally {
    inProgress.delete(query);
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.INGEST_PORT || 8000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Ingestion service running on port ${PORT}`));
});