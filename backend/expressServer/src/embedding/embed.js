import { pipeline } from "@huggingface/transformers";
import dotenv from 'dotenv'

dotenv.config()
const model = process.env.MODEL || 'Xenova/bge-small-en-v1.5';

let embedder = null;

async function loadEmbedder() {
  if (!embedder) {
    console.log('loading embedding model (first call only, may take a few seconds)...');
    embedder = await pipeline('feature-extraction', model);
  }
  console.log('embedding model loaded:', typeof embedder)
  return embedder;
}
export async function embedQuery(text) {
  const model = await loadEmbedder()
  const vectors = await model([text], { pooling: 'mean', normalize: true })
  return vectors.tolist()[0];
}