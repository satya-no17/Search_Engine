# ⚡ Meowgle — AI-Powered Semantic Search & Data Ingestion Engine

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js%2015-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express.js](https://img.shields.io/badge/Express%205-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Vector%20Search-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Hugging Face](https://img.shields.io/badge/Transformers.js-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A high-performance semantic search platform engineered for developers — combining dense vector retrieval, on-device local embeddings, a multi-source data ingestion pipeline, and an interactive CLI.**

[Architecture](#-architecture) • [Features](#-key-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [API & CLI](#-api--cli-reference)

</div>

---

## 🏗️ Architecture

The system is designed around a decoupled, service-oriented architecture that balances real-time query speed with background data crawling and vectorization:

```
                                  ┌───────────────────────────────┐
                                  │      Next.js 15 Frontend      │
                                  │ (App Router, React 19, TWC4)  │
                                  └───────────────┬───────────────┘
                                                  │ HTTP (port 3000)
                                                  ▼
                                  ┌───────────────────────────────┐
                                  │     Express 5 API Gateway     │
                                  │  (Query Routing & Formatting) │
                                  └───────┬───────────────┬───────┘
                                          │               │
                    1. Embed Query Vector │               │ 3. Trigger JIT Ingestion
                (BGE-small-en via ONNX)   │               │    (Async Fire-and-Forget)
                                          ▼               ▼
                       ┌──────────────────────┐   ┌───────────────────────────────┐
                       │    MongoDB Atlas     │   │      Ingestion Pipeline       │
                       │ Vector Search Index  │   │     (Worker & Express 8001)   │
                       │   ($vectorSearch)    │   └───────────────┬───────────────┘
                       └──────────────────────┘                   │
                                                  ┌───────────────┴───────────────┐
                                                  │ Multi-Source Crawlers:        │
                                                  │ • GitHub Repositories API     │
                                                  │ • StackOverflow Search API    │
                                                  │ • Reddit Discussions API      │
                                                  │ • Hacker News Algolia API     │
                                                  │ • Dev.to Technical Articles   │
                                                  └───────────────────────────────┘
```

---

## ✨ Key Features

- 🧠 **On-Device Semantic Vector Search**: Generates normalized 384-dimensional dense embeddings directly in Node.js runtime using `@huggingface/transformers` (`BAAI/bge-small-en-v1.5`) without external paid inference dependencies.
- ⚡ **MongoDB Atlas `$vectorSearch`**: Executes high-throughput k-NN vector similarity queries with cosine distance metrics, candidate projections, and metadata filtering.
- 🔄 **Reactive Just-In-Time (JIT) Ingestion**: Every search query automatically queues asynchronous background crawling across 5 developer platforms to continuously refresh and expand the knowledge index.
- 🛡️ **URL Deduplication Engine**: Pre-filters existing document URLs prior to vector embedding calculation to eliminate redundant ML computation and optimize DB write throughput.
- 💻 **Interactive Ingestion CLI**: Includes a rich terminal utility (`@clack/prompts`, `figlet`, `gradient-string`) for manual querying, source isolation, and database seeding.
- 🎨 **Modern Developer UI**: Dark-mode-first developer search interface featuring category filtering (GitHub, StackOverflow, Reddit, Hacker News, Dev.to), source branding, and responsive layout.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/) |
| **API Gateway** | [Express 5](https://expressjs.com/), [Node.js](https://nodejs.org/) (ES Modules), Axios, CORS |
| **Embedding Model** | `@huggingface/transformers` (ONNX Runtime, `Xenova/bge-small-en-v1.5`) |
| **Vector Database** | [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-vector-search) (`$vectorSearch` Index) |
| **Ingestion Sources** | GitHub REST API, StackExchange API, Reddit JSON API, Hacker News Algolia API, Dev.to API |
| **CLI Tooling** | `@clack/prompts`, `chalk`, `figlet`, `gradient-string` |

---

## 📁 Repository Structure

```text
Search_Engine/
├── backend/
│   ├── expressServer/            # Primary API Gateway (Port 5000)
│   │   ├── src/
│   │   │   ├── config/db.js      # MongoDB connection pool & collection helpers
│   │   │   ├── controllers/      # Search aggregation & JIT ingestion triggers
│   │   │   ├── embedding/        # In-process HuggingFace ONNX feature extractor
│   │   │   └── routes/           # REST API route definitions
│   │   ├── server.js             # Gateway entry point
│   │   └── package.json
│   │
│   └── ingestionPipeline/        # Data Scraper & Vector Indexer (Port 8001)
│       ├── src/
│       │   ├── config/db.js      # Dedicated DB connector
│       │   ├── embedding/        # Batch vector embedding generator
│       │   ├── ingestion/        # Source crawlers (GitHub, Reddit, HN, Stack, Dev.to)
│       │   └── lib/topics.js     # Default topic corpus for automated seeding
│       ├── cli.js                # Interactive terminal management CLI
│       ├── seed.js               # Automated seed runner
│       ├── server.js             # Background ingestion webhook server
│       ├── main.js               # Ingestion orchestrator & deduplication
│       └── package.json
│
├── main/                         # Next.js 15 Web Application (Port 3000)
│   ├── app/
│   │   ├── search/page.js        # Search results page with category filters
│   │   ├── layout.js             # Root layout with font and theme wrapper
│   │   ├── globals.css           # Tailwind CSS v4 styling & dark theme tokens
│   │   └── page.js               # Home hero search landing page
│   ├── components/               # ThemeProvider, Results, and Footer components
│   └── public/                   # Source logos (GitHub, StackOverflow, HN, Dev.to)
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18+ (v20+ recommended)
- **MongoDB Atlas Cluster** with a Vector Search index named `vector_index` configured on the `embedding` path (384 dimensions, cosine similarity).

---

### 1. Configure Environment Variables

Create `.env` files in both backend services:

**`backend/expressServer/.env`**
```env
PORT=5000
MODEL="Xenova/bge-small-en-v1.5"
MONGO_URI="your_mongodb_connection_string"
```

**`backend/ingestionPipeline/.env`**
```env
PORT=8001
MODEL="Xenova/bge-small-en-v1.5"
MONGO_URI="your_mongodb_connection_string"
GIT_TOKEN="your_optional_github_token"
STACKOVERFLOW_KEY="your_optional_stack_key"
```

---

### 2. Start Services

#### A. Ingestion Service (Background Crawler)
```bash
cd backend/ingestionPipeline
npm install
npm run dev
```
*Runs on `http://localhost:8001`*

#### B. API Gateway
```bash
cd backend/expressServer
npm install
npm run dev
```
*Runs on `http://localhost:5000`*

#### C. Next.js Frontend
```bash
cd main
npm install
npm run dev
```
*Open [http://localhost:3000](http://localhost:3000) in your browser.*

---

## 💻 CLI & Seeding Tool

Run the interactive terminal ingestion wizard to test sources or seed topics manually:

```bash
cd backend/ingestionPipeline

# Launch interactive CLI
node cli.js

# Or run the batch seeder across default topics
node seed.js both
```

---

## 📡 API Reference

### `GET /query/search`
Searches indexed documents using dense vector similarity.

**Query Parameters:**
- `q` *(string, required)*: The search term or natural language developer question.
- `category` *(string, optional)*: Filter by platform (`all`, `github`, `stackoverflow`, `hackernews`, `devto`, `reddit`).

**Example Request:**
```bash
curl "http://localhost:5000/query/search?q=docker+compose+mongodb&category=github"
```

**Sample Response:**
```json
[
  {
    "_id": "67cb15c0e123...",
    "title": "docker-compose-mongo-cluster",
    "description": "Production-ready MongoDB cluster with replica sets using Docker Compose",
    "url": "https://github.com/example/docker-compose-mongo-cluster",
    "source": "github",
    "stars": 420,
    "score": 0.9142
  }
]
```

---

## 🗺️ Roadmap

- [x] In-process ONNX vector embeddings with `@huggingface/transformers`
- [x] Multi-platform developer API ingestion (GitHub, Reddit, HN, StackOverflow, Dev.to)
- [x] MongoDB Atlas `$vectorSearch` with score projections
- [x] Interactive Terminal CLI for index operations
- [ ] Hybrid Search (BM25 Lexical + Vector Dense Retrieval via Reciprocal Rank Fusion)
- [ ] Streaming Generative AI summaries (RAG) using LLM synthesis
- [ ] Distributed Task Queue migration with Redis & BullMQ
- [ ] Docker Compose multi-service deployment

---

## 👤 Author

**Satyam Kumar**
- GitHub: [@satya-no17](https://github.com/satya-no17)
- LinkedIn: [satyam-kumar](https://www.linkedin.com/in/satyam-kumar-929b97325/)
