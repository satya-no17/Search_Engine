import dotenv from 'dotenv';
dotenv.config();

import { connectDB, closeDB } from './src/config/db.js';
import { ingest, ingestGithub, ingestReddit } from './main.js';
import { TOPICS } from './src/config/topics.js';

const source = (process.argv[2] || 'both').toLowerCase();

const sourceMap = {
  github: ingestGithub,
  reddit: ingestReddit,
  both: ingest,
};

const runIngest = sourceMap[source];
if (!runIngest) {
  console.error(`Unknown source "${source}". Use github, reddit, or both.`);
  process.exit(1);
}

async function seed() {
  await connectDB();

  let i = 1;
  for (const topic of TOPICS) {
    try {
      const result = await runIngest(topic);
      console.log(`${i} "${topic}" -> inserted ${result.inserted}`);
    } catch (err) {
      console.error(`${i} "${topic}" -> failed:`, err.message);
    }
    i += 1;

    // spacing protects Reddit's tighter rate limit; harmless if github-only
    await new Promise(r => setTimeout(r, 3000));
  }

  await closeDB();
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});