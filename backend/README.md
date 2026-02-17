# ProXplore Backend (Python)

A production-ready search engine backend built with Python, Flask, and BeautifulSoup.

## 🚀 Features

- **Web Crawler**: Crawls 50+ popular tech websites
- **NDJSON Storage**: Efficient line-delimited JSON format
- **In-Memory Search**: Fast RAM-based search with ranking
- **REST API**: Simple HTTP API with CORS support
- **Smart Ranking**: Boosts results from proxentix.in and proxpl.in

## 📋 Requirements

- Python 3.8 or higher
- pip (Python package manager)

## 🛠️ Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Crawler

Crawl websites and build the search index:

```bash
python crawler.py
```

This will create `index.json` with crawled data.

### 3. Start the Server

```bash
python server.py
```

Server will start on `http://0.0.0.0:8080`

## 🔌 API Endpoints

### Home
```
GET http://localhost:8080/
```

Returns API information and statistics.

### Search
```
GET http://localhost:8080/search?q=python
```

**Query Parameters:**
- `q` - Search query (required)

**Response:**
```json
{
  "query": "python",
  "results": [
    {
      "title": "Welcome to Python.org",
      "url": "https://python.org",
      "score": 1015,
      "snippet": "The official home of the Python..."
    }
  ],
  "total_results": 10
}
```

### Health Check
```
GET http://localhost:8080/health
```

Returns server health status.

## 📱 Mobile App Integration

Get your local IP address:

**Windows:**
```bash
ipconfig
```

**Linux/Mac:**
```bash
ifconfig
```

Update your mobile app to use: `http://YOUR_IP:8080/search?q=query`

## 🏗️ Project Structure

```
backend/
├── crawler.py          # Web crawler module
├── database.py         # JSON utilities
├── server.py           # Flask API server
├── requirements.txt    # Python dependencies
├── index.json         # Crawled data (generated)
└── README.md          # This file
```

## 🎯 Ranking Algorithm

Results are scored based on:
- **Base score**: 1 point
- **URL match**: +3 points
- **Content match**: +5 points
- **Title match**: +10 points
- **Domain boost**: +1000 points (proxentix.in, proxpl.in)

Results are sorted by score (highest first) and limited to top 20.

## 🔧 Troubleshooting

### "index.json not found"
Run `python crawler.py` first to generate the index.

### Port already in use
Change the port in `server.py`:
```python
port = 8080  # Change to another port
```

### CORS errors
CORS is already enabled. Ensure your mobile app uses the correct server IP.

## 📝 Notes

- Crawler waits 1 second between requests (polite crawling)
- Content is limited to 5000 characters per page
- Top 20 results are returned per search
- All data is stored in-memory for fast access

## 🚦 Production Deployment

For production use:
1. Use a production WSGI server (gunicorn, waitress)
2. Add rate limiting
3. Implement caching
4. Use a proper database (PostgreSQL, MongoDB)
5. Add authentication if needed

Example with gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8080 server:app
```

## 📄 License

Educational project for ProXplore search engine.
