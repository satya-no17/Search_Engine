import dotenv from 'dotenv';
dotenv.config();

import { getCollection } from './src/config/db.js';
import { embedBatch } from './src/embedding/embed.js';
import { fetchGithubRepos } from './src/ingestion/github.js';
import { fetchRedditPosts } from './src/ingestion/reddit.js';
import { fetchDevToArticles } from './src/ingestion/devIo.js';
import { fetchHackerNews } from './src/ingestion/hackerNews.js';
import { fetchStackOverflowPosts } from './src/ingestion/stackOverflow.js';

// ============================================================================
// DEDUPLICATION OPTIONS (Uncomment whichever method you prefer later):Written by Ai later to examine to use in production 
// ============================================================================
//
// OPTION 1: Filter existing URLs BEFORE embedding (Saves ML computation time)
// ----------------------------------------------------------------------------
// async function embedAndInsert(docs) {
//   if (!docs.length) {
//     console.log('No documents fetched, nothing to insert.');
//     return { inserted: 0 };
//   }
//
//   const collection = getCollection();
//
//   // Check MongoDB for already existing URLs
//   const urls = docs.map(doc => doc.url).filter(Boolean);
//   const existingDocs = await collection.find({ url: { $in: urls } }, { projection: { url: 1 } }).toArray();
//   const existingUrls = new Set(existingDocs.map(d => d.url));
//
//   // Keep only new documents that are not in the DB
//   const newDocs = docs.filter(doc => !existingUrls.has(doc.url));
//
//   if (!newDocs.length) {
//     console.log('All documents already exist in DB, skipping embedding.');
//     return { inserted: 0 };
//   }
//
//   // Embed only new documents
//   const texts = newDocs.map(doc => doc.text);
//   const vectors = await embedBatch(texts);
//
//   const finalDocs = newDocs.map((doc, i) => {
//     const { text, ...rest } = doc;
//     return { ...rest, embedding: vectors[i], createdAt: new Date() };
//   });
//
//   await collection.insertMany(finalDocs);
//   return { inserted: finalDocs.length };
// }
//
// OPTION 2: Upsert with bulkWrite (Updates existing documents & inserts new ones)
// ----------------------------------------------------------------------------
// async function embedAndInsert(docs) {
//   if (!docs.length) {
//     console.log('No documents fetched, nothing to insert.');
//     return { inserted: 0 };
//   }
//
//   const collection = getCollection();
//   const texts = docs.map(doc => doc.text);
//   const vectors = await embedBatch(texts);
//
//   const finalDocs = docs.map((doc, i) => {
//     const { text, ...rest } = doc;
//     return { ...rest, embedding: vectors[i], updatedAt: new Date() };
//   });
//
//   const operations = finalDocs.map(doc => ({
//     updateOne: {
//       filter: { url: doc.url },
//       update: { $set: doc },
//       upsert: true,
//     },
//   }));
//
//   const result = await collection.bulkWrite(operations);
//   const total = (result.upsertedCount || 0) + (result.modifiedCount || 0);
//   return { inserted: total };
// }
// ============================================================================

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

export async function ingestDevTo(query) {
  const docs = await fetchDevToArticles(query).catch(err => {
    console.error('DevTo fetch failed:', err.message);
    return [];
  });
  const result = await embedAndInsert(docs);
  console.log(`[devto] "${query}" -> inserted ${result.inserted}`);
  return result;
}

export async function ingestHackerNews(query) {
  const docs = await fetchHackerNews(query).catch(err => {
    console.error('HackerNews fetch failed:', err.message);
    return [];
  });
  const result = await embedAndInsert(docs);
  console.log(`[hackernews] "${query}" -> inserted ${result.inserted}`);
  return result;
}

export async function ingestStackOverflow(query) {
  const docs = await fetchStackOverflowPosts(query).catch(err => {
    console.error('StackOverflow fetch failed:', err.message);
    return [];
  });
  const result = await embedAndInsert(docs);
  console.log(`[stackoverflow] "${query}" -> inserted ${result.inserted}`);
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

// for the server & "All" CLI option
export async function ingest(query) {
  const [githubResult, devToResult, hackerNewsResult, stackOverflowResult, redditResult] = await Promise.all([
    ingestGithub(query),
    ingestDevTo(query),
    ingestHackerNews(query),
    ingestStackOverflow(query),
    ingestReddit(query),
  ]);

  const total = githubResult.inserted + devToResult.inserted + hackerNewsResult.inserted + stackOverflowResult.inserted + redditResult.inserted;
  console.log(`[all] "${query}" -> inserted ${total} total (${githubResult.inserted} github, ${devToResult.inserted} devto, ${hackerNewsResult.inserted} hackernews, ${stackOverflowResult.inserted} stackoverflow, ${redditResult.inserted} reddit)`);
  return { inserted: total, github: githubResult.inserted, devto: devToResult.inserted, hackernews: hackerNewsResult.inserted, stackoverflow: stackOverflowResult.inserted, reddit: redditResult.inserted };
}