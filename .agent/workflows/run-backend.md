---
description: Run ProXplore backend server
---

# Running ProXplore Backend Server

This workflow helps you start the ProXplore search engine backend.

## Prerequisites

1. Ensure Python 3.8+ is installed
2. Install dependencies (first time only):
```bash
cd backend
pip install -r requirements.txt
```

## Steps

### Option 1: Using Helper Scripts (Windows)

1. **Create sample data** (for quick testing):
```bash
cd backend
python create_sample_data.py
```

2. **Start the server**:
```bash
run_server.bat
```
OR
```bash
python server.py
```

### Option 2: Full Production Setup

1. **Run the crawler** (crawls 50+ websites):
```bash
cd backend
python crawler.py
```
This will take several minutes.

2. **Start the server**:
```bash
python server.py
```

## Server Information

- **Port**: 8080
- **Endpoints**:
  - Home: `http://localhost:8080/`
  - Search: `http://localhost:8080/search?q=your_query`
  - Health: `http://localhost:8080/health`

## Mobile App Configuration

Update your mobile app to point to the server:

**For testing on physical device:**
1. Get your local IP address:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` (look for inet)

2. Update API endpoint in mobile app:
```javascript
const API_URL = 'http://YOUR_IP:8080/search';
```

**For emulator/simulator:**
```javascript
const API_URL = 'http://localhost:8080/search';
```

## Stopping the Server

Press `Ctrl+C` in the terminal running the server.

## Troubleshooting

- **"index.json not found"**: Run `python create_sample_data.py` or `python crawler.py` first
- **Port already in use**: Change port in `server.py` (line 204)
- **Module not found**: Run `pip install -r requirements.txt`
