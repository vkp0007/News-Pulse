# News Pulse

News Pulse is a full-stack news aggregation platform that automatically collects articles from multiple public RSS feeds, extracts complete article content, groups related stories into topic clusters using TF-IDF and cosine similarity, and visualizes news activity through an interactive timeline.

---

## Live Demo

**Frontend:** https://news-pulse-vv7h.vercel.app/

**Backend API:** https://news-pulse-5huk.onrender.com

**Video Walkthrough:** https://www.loom.com/share/a0dbd3483ec84ef1be5e33feda7273f0

---

## News Sources

The application currently aggregates articles from the following public RSS feeds:

* BBC News — https://www.bbc.com/news/rss.xml
* NPR — https://feeds.npr.org/1001/rss.xml
* Al Jazeera — https://www.aljazeera.com/xml/rss/all.xml

---

## Features

* Fetches news articles from multiple RSS feeds
* Normalizes different RSS feed formats into a common schema
* Extracts complete article content using Trafilatura
* Removes newsletters, subscription prompts, and boilerplate content
* Groups related articles into topic clusters using TF-IDF and cosine similarity
* Interactive timeline showing topic activity over time
* Cluster detail view with complete article list
* Filter clusters by news source
* Trigger ingestion pipeline directly from the dashboard
* Responsive and modern user interface

---

## Project Structure

```text
News-Pulse/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── news-pulse/              # Python RSS ingestion & clustering pipeline
│   │   ├── clustering/
│   │   ├── models/
│   │   ├── rss/
│   │   ├── utils/
│   │   ├── pipeline.py
│   │   └── requirements.txt
│   ├── package.json
│   └── index.js
│
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```

---

## Architecture

```text
               RSS Feeds
      (BBC, NPR, Al Jazeera)
                    │
                    ▼
      Python Pipeline (backend/news-pulse)
      ┌──────────────────────────────┐
      │ Fetch RSS feeds              │
      │ Normalize feed entries       │
      │ Extract article content      │
      │ Clean boilerplate            │
      │ TF-IDF Vectorization         │
      │ Topic Clustering             │
      └──────────────────────────────┘
                    │
                    ▼
              MongoDB Atlas
                    ▲
                    │
           Express.js REST API
                    │
                    ▼
             React Dashboard
```

---

## Topic Grouping Approach

The project uses **TF-IDF Vectorization** together with **Cosine Similarity** to group related news articles.

### Workflow

1. Fetch RSS articles.
2. Normalize articles into a common schema.
3. Download the complete article webpage.
4. Extract the main article body using Trafilatura.
5. Clean boilerplate text.
6. Preprocess article text.
7. Generate TF-IDF vectors.
8. Compute cosine similarity.
9. Cluster similar articles.
10. Generate representative cluster labels.

### Why TF-IDF?

TF-IDF is lightweight, interpretable, and effective for grouping news articles that share significant keywords without requiring external AI services.

### Limitation

Since TF-IDF relies on lexical similarity, articles describing the same event using different vocabulary may not always be grouped together. Semantic embedding models such as Sentence Transformers could further improve clustering quality.

---

## Backend API

| Method | Endpoint                    | Description                           |
| ------ | --------------------------- | ------------------------------------- |
| GET    | `/api/clusters`             | List all topic clusters               |
| GET    | `/api/clusters/:id`         | Retrieve cluster details and articles |
| GET    | `/api/clusters/timeline`    | Timeline data for visualization       |
| POST   | `/api/ingest/trigger`       | Trigger RSS ingestion pipeline        |
| GET    | `/api/ingest/status/:jobId` | Check ingestion job status            |

---

## Technology Stack

### Frontend

* React
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Python Pipeline

* Feedparser
* Requests
* Trafilatura
* BeautifulSoup
* Scikit-learn
* NumPy
* NLTK

---

## Setup

### Backend

```bash
cd backend

npm install

pip install -r news-pulse/requirements.txt

npm start
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

### Backend

```env
PORT=

MONGO_URI=

CLIENT_URL=

PYTHON_PATH=

PYTHON_PIPELINE=
```

### Frontend

```env
VITE_API_URL=
```

---

## Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

---

## Future Improvements

* Semantic clustering using sentence embeddings
* Automatic scheduled ingestion
* Live timeline updates
* Cross-source story merging
* Improved cluster label generation
* Search functionality
* Sentiment analysis
