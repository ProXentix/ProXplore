
import unittest
from ranking import BM25Ranker

class TestBM25Ranker(unittest.TestCase):
    def setUp(self):
        self.ranker = BM25Ranker()
        self.corpus = [
            {'title': 'Python Programming', 'content': 'Python is a great programming language'},
            {'title': 'Java Programming', 'content': 'Java is also a programming language but verbose'},
            {'title': 'Cooking Recipes', 'content': 'How to cook pasta and pizza'},
            {'title': 'ProXplore Search', 'content': 'ProXplore is a new search engine'}
        ]
        self.ranker.fit(self.corpus)

    def test_tokenize(self):
        text = "Hello World! 123"
        tokens = self.ranker.tokenize(text)
        self.assertEqual(tokens, ['hello', 'world', '123'])

    def test_relevance_score(self):
        # Query matching the first doc
        query = "python language"
        
        scores = []
        for i in range(len(self.corpus)):
            scores.append(self.ranker.get_score(query, i))
            
        # Doc 0 should have highest score
        self.assertTrue(scores[0] > scores[1]) # Doc 0 has "python", Doc 1 doesn't
        self.assertTrue(scores[0] > scores[2])
        
    def test_no_match(self):
        query = "zebra"
        score = self.ranker.get_score(query, 0)
        self.assertEqual(score, 0.0)

    def test_partial_match(self):
        # "programming" is in both doc 0 and 1
        query = "programming"
        score0 = self.ranker.get_score(query, 0)
        score1 = self.ranker.get_score(query, 1)
        self.assertTrue(score0 > 0)
        self.assertTrue(score1 > 0)

if __name__ == '__main__':
    unittest.main()
