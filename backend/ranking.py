import math
import re
import pickle
import os
from collections import Counter, defaultdict

class BM25Ranker:
    def __init__(self, k1=1.5, b=0.75):
        """
        Initialize BM25 Ranker with Inverted Index
        k1: Term frequency saturation parameter (default 1.5)
        b: Length normalization parameter (default 0.75)
        """
        self.k1 = k1
        self.b = b
        self.corpus_size = 0
        self.avgdl = 0
        self.doc_freqs = {}
        self.idf = {}
        self.doc_len = []
        self.doc_term_freqs = []
        
        # Inverted Index: token -> list of doc_indices
        self.inverted_index = defaultdict(list)

    def tokenize(self, text):
        """Simple tokenizer that lowercases and extracts alphanumeric words"""
        if not text:
            return []
        return re.findall(r'\w+', text.lower())

    def fit(self, corpus):
        """
        Fits the ranker to the corpus and builds Inverted Index.
        Corpus is a list of documents (dicts with 'title' and 'content').
        """
        self.corpus_size = len(corpus)
        self.doc_len = []
        self.doc_term_freqs = []
        self.doc_freqs = {} 
        self.inverted_index = defaultdict(list)
        
        total_length = 0
        
        print("Training BM25 ranker on corpus...")
        
        for doc_index, doc in enumerate(corpus):
            # Combine title and content for indexing
            text = (doc.get('title', '') + " " + doc.get('content', ''))
            tokens = self.tokenize(text)
            length = len(tokens)
            self.doc_len.append(length)
            total_length += length
            
            # Term frequencies in this doc
            freqs = Counter(tokens)
            self.doc_term_freqs.append(freqs)
            
            # Update Inverted Index and Document Frequencies
            unique_tokens = set(tokens)
            for token in unique_tokens:
                self.doc_freqs[token] = self.doc_freqs.get(token, 0) + 1
                self.inverted_index[token].append(doc_index)
                
        self.avgdl = total_length / self.corpus_size if self.corpus_size > 0 else 0
        
        # Calculate IDF
        self.idf = {}
        for token, freq in self.doc_freqs.items():
            # IDF formula: log((N - n + 0.5) / (n + 0.5) + 1)
            self.idf[token] = math.log((self.corpus_size - freq + 0.5) / (freq + 0.5) + 1)
            
        print(f"BM25 training complete. Vocabulary size: {len(self.idf)}")

    def search(self, query, top_k=100):
        """
        Efficiently searches the inverted index for the query.
        Returns a list of (doc_index, score) tuples.
        """
        query_tokens = self.tokenize(query)
        if not query_tokens:
            return []
            
        # 1. Retrieve candidates (boolean OR)
        candidate_ids = set()
        for token in query_tokens:
            if token in self.inverted_index:
                candidate_ids.update(self.inverted_index[token])
        
        if not candidate_ids:
            return []

        # 2. Score candidates
        scores = []
        for doc_idx in candidate_ids:
            score = self.get_score_fast(query_tokens, doc_idx)
            scores.append((doc_idx, score))
            
        # 3. Sort by score (descending) and return top_k
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[:top_k]

    def get_score_fast(self, query_tokens, doc_index):
        """
        Calculates BM25 score using pre-tokenized query for speed.
        """
        if doc_index >= len(self.doc_len):
            return 0.0
            
        score = 0.0
        doc_len = self.doc_len[doc_index]
        
        # Get pre-computed term frequencies for this doc
        doc_terms = self.doc_term_freqs[doc_index]
        
        for token in query_tokens:
            if token not in self.doc_freqs:
                continue
                
            freq = doc_terms.get(token, 0)
            idf = self.idf.get(token, 0)
            
            # BM25 formula component for this term
            numerator = freq * (self.k1 + 1)
            denominator = freq + self.k1 * (1 - self.b + self.b * (doc_len / self.avgdl))
            
            score += idf * (numerator / denominator)
            
        return score

    def get_score(self, query, doc_index):
        """
        Legacy method for backward compatibility.
        """
        return self.get_score_fast(self.tokenize(query), doc_index)
        
    def save(self, filepath):
        """Saves the ranker to a file"""
        try:
            with open(filepath, 'wb') as f:
                pickle.dump(self, f)
            print(f"Ranker saved to {filepath}")
        except Exception as e:
            print(f"Error saving ranker: {e}")
            
    @staticmethod
    def load(filepath):
        """Loads the ranker from a file"""
        try:
            with open(filepath, 'rb') as f:
                return pickle.load(f)
        except Exception as e:
            print(f"Error loading ranker: {e}")
            return None
