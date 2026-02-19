"""
ProXplore HTTP API Server
Provides search API with ranking and CORS support
"""

import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from ranking import BM25Ranker

app = Flask(__name__)
CORS(app)  # Enable CORS for mobile app

# In-memory database
memory_db = []
ranker = BM25Ranker()


def load_index():
    """Loads index.json into memory"""
    global memory_db
    
    # Get the directory where server.py is located
    base_dir = os.path.dirname(os.path.abspath(__file__))
    index_path = os.path.join(base_dir, 'index.json')
    
    if not os.path.exists(index_path):
        print(f"ERROR: index.json not found at {index_path}. Run crawler.py first!")
        return
    
    print(f"Loading {index_path} into RAM...")
    
    try:
        with open(index_path, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                line = line.strip()
                if line:
                    try:
                        item = json.loads(line)
                        if 'url' in item and 'title' in item and 'content' in item:
                            item['score'] = 0  # Initialize score
                            memory_db.append(item)
                    except json.JSONDecodeError as e:
                        print(f"Warning: Invalid JSON on line {line_num}: {e}")
        
        print(f"✓ Loaded {len(memory_db)} items into memory")
        
        # Train Ranker
        if memory_db:
            ranker.fit(memory_db)
        
    except Exception as e:
        print(f"Error loading index: {e}")


def search_index(query):
    """
    Searches the in-memory index using BM25 and heuristics
    
    Args:
        query (str): Search query
        
    Returns:
        list: List of matching results with scores
    """
    if not query or len(query.strip()) == 0:
        return []
    
    query_lower = query.lower().strip()
    results = []
    
    for i, item in enumerate(memory_db):
        # Calculate BM25 score
        bm25_score = ranker.get_score(query, i)
        
        # Heuristic: Check for exact phrase/substring match
        # This helps with partial word matches that BM25 (word-based) might miss
        is_substring_match = False
        title_lower = item['title'].lower()
        content_lower = item['content'].lower()
        url_lower = item['url'].lower()
        
        if query_lower in title_lower or query_lower in content_lower:
            is_substring_match = True
            
        # Filter: Must match either via BM25 (words) or substring
        if bm25_score <= 0 and not is_substring_match:
            continue
            
        final_score = bm25_score
        
        # Boosts
        if is_substring_match:
            final_score += 5.0  # Boost for phrase match
            
        if query_lower in title_lower:
            final_score += 10.0 # Extra boost if in title
            
        if query_lower in url_lower:
            final_score += 3.0
            
        # Super boost for proxentix/proxpl domains
        if 'proxentix' in url_lower or 'proxpl' in url_lower:
            final_score += 1000
            
        results.append({
            'title': item['title'],
            'url': item['url'],
            'score': final_score,
            'snippet': item['content'][:200]  # First 200 chars as snippet
        })
    
    # Sort by score (descending)
    results.sort(key=lambda x: x['score'], reverse=True)
    
    # Limit to top 20 results
    return results[:20]


@app.route('/')
def home():
    """Home endpoint"""
    return jsonify({
        'message': 'Welcome to ProXplore API',
        'version': '1.0',
        'endpoints': {
            'search': '/search?q=your_query',
            'health': '/health'
        },
        'total_indexed': len(memory_db)
    })


@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'indexed_pages': len(memory_db)
    })


@app.route('/search')
def search():
    """
    Search endpoint
    Query parameter: q (search query)
    """
    query = request.args.get('q', '')
    
    if not query:
        return jsonify({
            'error': 'Missing query parameter',
            'usage': '/search?q=your_query'
        }), 400
    
    print(f"Searching for: {query}")
    
    results = search_index(query)
    
    return jsonify({
        'query': query,
        'results': results,
        'total_results': len(results)
    })


def main():
    """Main server function"""
    # Load index into memory
    load_index()
    
    if len(memory_db) == 0:
        print("\n⚠️  WARNING: No data loaded. Run crawler.py first!\n")
    
    # Start server
    port = 8080
    print(f"\n{'='*60}")
    print(f"ProXplore API Server")
    print(f"{'='*60}")
    print(f"Server running on: http://0.0.0.0:{port}")
    print(f"Local access: http://localhost:{port}")
    print(f"Search endpoint: http://localhost:{port}/search?q=your_query")
    print(f"{'='*60}\n")
    
    app.run(host='0.0.0.0', port=port, debug=False)


if __name__ == "__main__":
    main()
