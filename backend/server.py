"""
ProXplore HTTP API Server
Provides search API with ranking and CORS support
"""

import json
import os
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from ranking import BM25Ranker
from query_processor import QueryProcessor

app = Flask(__name__)
CORS(app)  # Enable CORS for mobile app

# In-memory database
memory_db = []
ranker = BM25Ranker()
processor = QueryProcessor()


def load_index():
    """Loads index.json into memory and initializes ranker"""
    global memory_db
    
    # Get the directory where server.py is located
    base_dir = os.path.dirname(os.path.abspath(__file__))
    index_path = os.path.join(base_dir, 'index.json')
    ranker_path = os.path.join(base_dir, 'bm25_index.pkl')
    
    if not os.path.exists(index_path):
        print(f"ERROR: index.json not found at {index_path}. Run crawler.py first!")
        return
    
    print(f"Loading {index_path} into RAM...")
    
    try:
        # 1. Load Documents
        with open(index_path, 'r', encoding='utf-8') as f:
            memory_db = []
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
        
        if not memory_db:
            return

        # 2. Load or Train Ranker
        ranker_loaded = False
        if os.path.exists(ranker_path):
            print(f"Found persisted index at {ranker_path}, loading...")
            loaded_ranker = BM25Ranker.load(ranker_path)
            if loaded_ranker and loaded_ranker.corpus_size == len(memory_db):
                global ranker
                ranker = loaded_ranker
                ranker_loaded = True
                print("✓ Successfully loaded persisted index")
            else:
                print("Persisted index stale or invalid. Rebuilding...")
        
        if not ranker_loaded:
            print("Building Inverted Index (this may take a while)...")
            ranker.fit(memory_db)
            ranker.save(ranker_path)
            
        # 3. Train Query Processor (fast)
        processor.fit(memory_db)
        
    except Exception as e:
        print(f"Error loading index: {e}")
        import traceback
        traceback.print_exc()


def search_index(query):
    """
    Searches the in-memory index using Inverted Index + BM25
    
    Args:
        query (str): Search query
        
    Returns:
        list: List of matching results with scores
    """
    if not query or len(query.strip()) == 0:
        return []
    
    query_lower = query.lower().strip()
    
    # 1. Retrieve Candidates using Inverted Index (Fast)
    # Get top 200 candidates by BM25 score
    candidates = ranker.search(query, top_k=200)
    
    results = []
    
    # 2. Re-rank/Boost Candidates
    for doc_idx, bm25_score in candidates:
        if doc_idx >= len(memory_db):
            continue
            
        item = memory_db[doc_idx]
        
        final_score = bm25_score
        
        title_lower = item['title'].lower()
        url_lower = item['url'].lower()
        content_lower = item['content'].lower()
        
        # Boosts
        # Exact phrase match in title/content is still valuable
        is_substring_match = query_lower in title_lower or query_lower in content_lower
        
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
            'snippet': item['content'][:200]
        })
    
    # Sort by score (descending)
    results.sort(key=lambda x: x['score'], reverse=True)
    
    # Limit to top 20 results
    return results[:20]


@app.route('/')
def home():
    """Home endpoint - Serves Web Interface"""
    return render_template('index.html')


@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'indexed_pages': len(memory_db),
        'vocabulrry_size': len(ranker.idf),
        'index_status': 'loaded' if len(memory_db) > 0 else 'empty_or_missing'
    })


@app.route('/suggest')
def suggest():
    """
    Auto-complete suggestions endpoint
    Query parameter: q (prefix)
    """
    prefix = request.args.get('q', '')
    if not prefix:
        return jsonify([])
        
    suggestions = processor.get_suggestions(prefix)
    return jsonify(suggestions)


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
    
    # Process Query (Spell check & Expansion)
    processed = processor.process_query(query)
    
    # Use the expanded query for better recall
    search_query = processed['expanded']
    if not search_query.strip():
        search_query = query # Fallback
        
    results = search_index(search_query)
    
    # If no results and correction was made, try searching strictly for correction
    if not results and processed['was_corrected']:
         # Try with just the corrected version
         results = search_index(processed['corrected'])
         
    # Fallback: If still no results, try original query (in case correction was wrong)
    if not results and processed['was_corrected']:
        results = search_index(query)
    
    response = {
        'query': query,
        'results': results,
        'total_results': len(results)
    }
    
    # Add correction info if applicable
    if processed['was_corrected']:
        response['did_you_mean'] = processed['corrected']
        
    return jsonify(response)


def main():
    """Main server function"""
    # Load index into memory
    load_index()
    
    if len(memory_db) == 0:
        print("\n⚠️  WARNING: No data loaded. Run crawler.py first!\n")
    
    # Start server
    port = 8080
    print(f"\n{'='*60}")
    print(f"ProXplore API Server (Optimized)")
    print(f"{'='*60}")
    print(f"Server running on: http://0.0.0.0:{port}")
    print(f"Local access: http://localhost:{port}")
    print(f"Search endpoint: http://localhost:{port}/search?q=your_query")
    print(f"{'='*60}\n")
    
    app.run(host='0.0.0.0', port=port, debug=False)


if __name__ == "__main__":
    main()

