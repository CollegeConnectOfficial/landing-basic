import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const app = express();
app.use(express.json());

const COUNTER_FILE = path.join(process.cwd(), 'counter.json');

// Helper functions for local storage
async function getCount() {
  try {
    const data = await fs.readFile(COUNTER_FILE, 'utf8');
    return JSON.parse(data).count || 0;
  } catch (error) {
    return 0;
  }
}

async function incrementCount() {
  const currentCount = await getCount();
  const newCount = currentCount + 1;
  await fs.writeFile(COUNTER_FILE, JSON.stringify({ count: newCount }));
  return newCount;
}

// Counter API endpoint
app.get('/api/counter', async (req, res) => {
  try {
    const count = await getCount();
    res.json({ count });
  } catch (error) {
    console.error('Error getting count:', error);
    res.status(500).json({ error: 'Failed to get count' });
  }
});

app.post('/api/counter', async (req, res) => {
  try {
    const newCount = await incrementCount();
    res.json({ count: newCount });
  } catch (error) {
    console.error('Error incrementing count:', error);
    res.status(500).json({ error: 'Failed to increment count' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
