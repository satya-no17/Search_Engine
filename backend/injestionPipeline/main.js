import dotenv from 'dotenv';
dotenv.config();

import { getCollection } from './src/config/db.js';
import { embedBatch } from './src/embedding/embed.js';
import { fetchGithubRepos } from './src/ingestion/github.js';
import { fetchRedditPosts } from './src/ingestion/reddit.js';

// shared logic: takes raw docs (with a `.text` field), embeds them, inserts them
async function embedAndInsert(docs) {
  if (!docs.length) {
    console.log('No documents fetched, nothing to insert.');
    return { inserted: 0 };
  }

  const collection = getCollection();
  const texts = docs.map(doc => doc.text);
  const vectors = await embedBatch(texts);

  const finalDocs = docs.map((doc, i) => {
    const { text, ...rest } = doc;
    return { ...rest, embedding: vectors[i] };
  });

  await collection.insertMany(finalDocs);
  return { inserted: finalDocs.length };
}

export async function ingestGithub(query) {
  const docs = await fetchGithubRepos(query).catch(err => {
    console.error('GitHub fetch failed:', err.message);
    return [];
  });
  const result = await embedAndInsert(docs);
  console.log(`[github] "${query}" -> inserted ${result.inserted}`);
  return result;
}

export async function ingestReddit(query) {
  const docs = await fetchRedditPosts(query).catch(err => {
    console.error('Reddit fetch failed:', err.message);
    return [];
  });
  const result = await embedAndInsert(docs);
  console.log(`[reddit] "${query}" -> inserted ${result.inserted}`);
  return result;
}




// forr the server
export async function ingest(query) {
  const [githubResult, redditResult] = await Promise.all([
    ingestGithub(query),
    ingestReddit(query),
  ]);

  const total = githubResult.inserted + redditResult.inserted;
  console.log(`[both] "${query}" -> inserted ${total} total (${githubResult.inserted} github, ${redditResult.inserted} reddit)`);
  return { inserted: total, github: githubResult.inserted, reddit: redditResult.inserted };
}