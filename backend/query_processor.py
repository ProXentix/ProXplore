import re
from collections import Counter

class QueryProcessor:
    def __init__(self):
        self.vocab = Counter()
        self.total_words = 0
        self.doc_titles = []
        
        # Common English Stopwords
        self.stopwords = {
            'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 
            'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 
            'to', 'was', 'were', 'will', 'with'
        }
        
        # Tech Synonyms Dictionary
        self.synonyms = {
            'js': ['javascript', 'js'],
            'javascript': ['js', 'javascript'],
            'py': ['python', 'py'],
            'python': ['py', 'python'],
            'ai': ['artificial intelligence', 'ai'],
            'ml': ['machine learning', 'ml'],
            'react': ['reactjs', 'react'],
            'reactjs': ['react', 'reactjs'],
            'db': ['database', 'db'],
            'database': ['db', 'database'],
            'web': ['website', 'internet', 'web'],
            'search': ['find', 'query', 'search']
        }

    def tokenize(self, text):
        """Extracts words from text"""
        return re.findall(r'\w+', text.lower())

    def fit(self, corpus):
        """
        Builds vocabulary from a list of documents.
        Corpus is a list of dicts with 'title' and 'content'.
        """
        print("Training QueryProcessor...")
        self.vocab = Counter()
        self.doc_titles = []
        
        for doc in corpus:
            # Add to vocabulary
            text = (doc.get('title', '') + " " + doc.get('content', ''))
            words = self.tokenize(text)
            self.vocab.update(words)
            
            # Store title for suggestions
            if 'title' in doc:
                self.doc_titles.append(doc['title'])
                
        self.total_words = sum(self.vocab.values())
        print(f"QueryProcessor trained. Vocab size: {len(self.vocab)}")

    def P(self, word): 
        """Probability of `word`."""
        N = self.total_words
        return self.vocab[word] / N if N > 0 else 0

    def correction(self, word): 
        """Most probable spelling correction for word."""
        # If word is known, return it
        if word in self.vocab:
            return word
            
        # Get candidates
        candidates = (self.known([word]) or 
                      self.known(self.edits1(word)) or 
                      self.known(self.edits2(word)) or 
                      [word])
        
        # Return the candidate with highest probability
        return max(candidates, key=self.P)

    def known(self, words): 
        """The subset of `words` that appear in the dictionary of frequencies."""
        return set(w for w in words if w in self.vocab)

    def edits1(self, word):
        """All edits that are one edit away from `word`."""
        letters    = 'abcdefghijklmnopqrstuvwxyz'
        splits     = [(word[:i], word[i:])    for i in range(len(word) + 1)]
        deletes    = [L + R[1:]               for L, R in splits if R]
        transposes = [L + R[1] + R[0] + R[2:] for L, R in splits if len(R)>1]
        replaces   = [L + c + R[1:]           for L, R in splits if R for c in letters]
        inserts    = [L + c + R               for L, R in splits for c in letters]
        return set(deletes + transposes + replaces + inserts)

    def edits2(self, word): 
        """All edits that are two edits away from `word`."""
        return (e2 for e1 in self.edits1(word) for e2 in self.edits1(e1))

    def get_suggestions(self, prefix, limit=5):
        """
        Returns auto-complete suggestions for a prefix.
        Prioritizes:
        1. Exact phrases (from titles)
        2. High frequency words
        """
        prefix = prefix.lower().strip()
        if not prefix:
            return []
            
        suggestions = []
        
        # 1. Check Titles (Phrase matching)
        for title in self.doc_titles:
            if title.lower().startswith(prefix):
                 suggestions.append(title)
            elif " " + prefix in title.lower(): # Match start of words in title
                 suggestions.append(title)
        
        # Limit title suggestions
        suggestions = sorted(list(set(suggestions)))[:3]
        
        # 2. Check Vocabulary (Word completion)
        # Find words starting with prefix, sort by frequency
        word_matches = [w for w in self.vocab if w.startswith(prefix)]
        word_matches.sort(key=lambda w: self.vocab[w], reverse=True)
        
        suggestions.extend(word_matches[:limit])
        
        # Dedup and limit
        return list(dict.fromkeys(suggestions))[:limit]

    def expand_query(self, query):
        """Expands query with synonyms"""
        words = self.tokenize(query)
        expanded_terms = set(words)
        
        for word in words:
            if word in self.synonyms:
                for syn in self.synonyms[word]:
                    expanded_terms.add(syn)
                    
        return " ".join(expanded_terms)

    def process_query(self, query):
        """
        Full pipeline:
        1. Tokenize
        2. Spell Correct
        3. Remove Stopwords (for search, optional)
        4. Return corrected query string and metadata
        """
        original_tokens = self.tokenize(query)
        corrected_tokens = []
        was_corrected = False
        
        for token in original_tokens:
            correction = self.correction(token)
            if correction != token:
                was_corrected = True
            corrected_tokens.append(correction)
            
        corrected_query = " ".join(corrected_tokens)
        
        return {
            "original": query,
            "corrected": corrected_query,
            "was_corrected": was_corrected,
            "expanded": self.expand_query(corrected_query)
        }
