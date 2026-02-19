
import unittest
import sys
import os

# Add backend to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from ranking import BM25Ranker

class TestInvertedIndex(unittest.TestCase):
    def setUp(self):
        self.ranker = BM25Ranker()
        self.corpus = [
            {'title': 'Python Tutorial', 'content': 'Learn Python programming language'},
            {'title': 'Java Tutorial', 'content': 'Learn Java programming'},
            {'title': 'Python vs Java', 'content': 'Comparison of Python and Java'},
            {'title': 'Cooking 101', 'content': 'How to cook rice'}
        ]
        self.ranker.fit(self.corpus)

    def test_inverted_index_structure(self):
        # 'python' should be in doc 0 and 2
        self.assertIn('python', self.ranker.inverted_index)
        self.assertIn(0, self.ranker.inverted_index['python'])
        self.assertIn(2, self.ranker.inverted_index['python'])
        self.assertNotIn(1, self.ranker.inverted_index['python'])
        
        # 'java' should be in doc 1 and 2
        self.assertIn('java', self.ranker.inverted_index)
        self.assertIn(1, self.ranker.inverted_index['java'])
        
    def test_search_single_term(self):
        # Search for 'python'
        results = self.ranker.search('python')
        # Should return doc 0 and 2
        doc_ids = [doc_id for doc_id, score in results]
        self.assertIn(0, doc_ids)
        self.assertIn(2, doc_ids)
        self.assertNotIn(1, doc_ids)
        self.assertNotIn(3, doc_ids)

    def test_search_multiple_terms(self):
        # Search for 'python java' (should return docs with either)
        results = self.ranker.search('python java')
        doc_ids = [doc_id for doc_id, score in results]
        self.assertIn(0, doc_ids) # has python
        self.assertIn(1, doc_ids) # has java
        self.assertIn(2, doc_ids) # has both
        self.assertNotIn(3, doc_ids)
        
        # Doc 2 should likely be highest rank (has both)
        # Note: Score depends on doc length and idf, but intuitively 2 matches both keys.
        # Let's check if score of 2 is > score of 0 or 1
        score_map = {doc_id: score for doc_id, score in results}
        self.assertGreater(score_map[2], score_map[0])

    def test_search_no_results(self):
        results = self.ranker.search('astronaut')
        self.assertEqual(len(results), 0)

    def test_persistence(self):
        # Test save and load
        self.ranker.save('test_index.pkl')
        loaded = BM25Ranker.load('test_index.pkl')
        self.assertIsNotNone(loaded)
        self.assertEqual(loaded.corpus_size, 4)
        self.assertIn('python', loaded.inverted_index)
        
        # Clean up
        if os.path.exists('test_index.pkl'):
            os.remove('test_index.pkl')

if __name__ == '__main__':
    unittest.main()
