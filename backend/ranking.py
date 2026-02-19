
import math
import re
from collections import Counter

class BM25Ranker:
    def __init__(self, k1=1.5, b=0.75):
        """
        Initialize BM25 Ranker
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

    def tokenize(self, text):
        """Simple tokenizer that lowercases and extracts alphanumeric words"""
        if not text:
            return []
        return re.findall(r'\w+', text.lower())

    def fit(self, corpus):
        """
        Fits the ranker to the corpus.
        Corpus is a list of documents (dicts with 'title' and 'content').
        """
        self.corpus_size = len(corpus)
        self.doc_len = []
        self.doc_term_freqs = []
        self.doc_freqs = {} 
        
        total_length = 0
        
        print("Training BM25 ranker on corpus...")
        
        for doc in corpus:
            # Combine title and content for indexing
            # Weight title more by repeating it? 
            # For now, just simplistic concatenation
            text = (doc.get('title', '') + " " + doc.get('content', ''))
            tokens = self.tokenize(text)
            length = len(tokens)
            self.doc_len.append(length)
            total_length += length
            
            # Term frequencies in this doc
            freqs = Counter(tokens)
            self.doc_term_freqs.append(freqs)
            
            # Document frequencies (unique terms per doc)
            unique_tokens = set(tokens)
            for token in unique_tokens:
                self.doc_freqs[token] = self.doc_freqs.get(token, 0) + 1
                
        self.avgdl = total_length / self.corpus_size if self.corpus_size > 0 else 0
        
        # Calculate IDF
        self.idf = {}
        for token, freq in self.doc_freqs.items():
            # IDF formula: log((N - n + 0.5) / (n + 0.5) + 1)
            self.idf[token] = math.log((self.corpus_size - freq + 0.5) / (freq + 0.5) + 1)
            
        print(f"BM25 training complete. Vocabulary size: {len(self.idf)}")

    def get_score(self, query, doc_index):
        """
        Calculates BM25 score for a specific document index against the query.
        """
        if doc_index >= len(self.doc_len):
            return 0.0
            
        score = 0.0
        doc_len = self.doc_len[doc_index]
        query_tokens = self.tokenize(query)
        
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
