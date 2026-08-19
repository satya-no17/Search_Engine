# 🔍 AI-Powered Search Engine

A modern, multi-tier search engine application combining a reactive Next.js frontend, an Express.js API gateway, and a Python-powered AI/vector search service.

---

## 🏗️ Architecture Overview

The project is structured as a decoupled three-tier microservice architecture:

```
[ Frontend (Next.js) ]
         │  HTTP / REST
         ▼
[ API Gateway (Express.js) ]
         │  HTTP / Internal RPC
         ▼
[ AI & Search Engine (Python / ChromaDB) ]
```

1. **Frontend (`main/`)**: Next.js App Router application built with React 19 and Tailwind CSS v4, delivering a responsive user search interface.
2. **API Gateway (`backend/expressServer/`)**: Express 5.x server acting as an API gateway to handle client requests, orchestration, CORS, and downstream service routing.
3. **AI Search Service (`backend/pythonAi/`)**: Python-based AI service utilizing ChromaDB for semantic search, vector embeddings, and retrieval.

---

## 📁 Project Structure

```text
Search_Engine/
├── backend/
│   ├── expressServer/         # Node.js / Express API Gateway
│   │   ├── src/
│   │   │   └── app.js         # Express app configuration
│   │   ├── server.js          # Server entry point
│   │   └── package.json       # Express dependencies & scripts
│   │
│   └── pythonAi/              # Python AI & Semantic Search Service
│       ├── chroma_storage/    # ChromaDB local vector store (auto-generated)
│       ├── main.py            # Python service entry point
│       └── requirements.txt   # Python dependencies
│
├── main/                      # Next.js Frontend Application
│   ├── app/                   # App Router pages and layouts
│   │   ├── globals.css        # Tailwind CSS imports & theme styles
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Home / Search page
│   ├── public/                # Static assets & icons
│   ├── next.config.mjs        # Next.js configuration
│   └── package.json           # Frontend dependencies & scripts
│
├── .gitignore                 # Root gitignore rules
└── README.md                  # Project documentation
```

---

## 🛠️ Tech Stack

### Frontend (`main`)
- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Linting**: ESLint 9

### Backend Gateway (`backend/expressServer`)
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express 5](https://expressjs.com/)
- **HTTP Client**: Axios
- **Utilities**: CORS, Dotenv

### AI Search Service (`backend/pythonAi`)
- **Language**: Python 3.x
- **Vector Database**: [ChromaDB](https://www.trychroma.com/)
- **Capabilities**: Vector embeddings, semantic similarity search, retrieval

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18+ (v20+ recommended)
- **npm** / **yarn** / **pnpm** / **bun**
- **Python**: v3.10+ and `pip` / `venv`

---

### 1. Setup & Run Backend Gateway (Express)

```bash
cd backend/expressServer

# Install dependencies
npm install

# Start development server (defaults to port 5000)
npm run dev
```

The Express API gateway will start on `http://localhost:5000`.

---

### 2. Setup & Run Python AI Service

```bash
cd backend/pythonAi

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the Python AI service
python main.py
```

---

### 3. Setup & Run Frontend (Next.js)

```bash
cd main

# Install dependencies
npm install

# Start Next.js development server (defaults to port 3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

Create `.env` files where required:

### Express Gateway (`backend/expressServer/.env`)
```env
PORT=5000
PYTHON_AI_URL=http://localhost:8000
```

### Python AI Service (`backend/pythonAi/.env`)
```env
PORT=8000
# Add embedding model or LLM API keys as needed (e.g., OPENAI_API_KEY, GEMINI_API_KEY)
```

---

## 🧭 Roadmap & Upcoming Features

- [ ] Semantic query embedding and vector indexing with ChromaDB.
- [ ] Express gateway proxying search queries to the Python AI engine.
- [ ] Real-time search UI with suggestions, filtering, and result summaries.
- [ ] Document ingestion pipeline (PDFs, Web pages, text documents).
- [ ] Hybrid search (lexical + dense semantic retrieval).

---

## 📄 License & Author

- **Author**: Satyam Kumar
- **License**: ISC
