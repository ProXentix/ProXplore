"""
Quick Test Script for ProXplore Backend
Tests a small subset of websites to verify functionality
"""

import requests
import time
from bs4 import BeautifulSoup
from database import format_ndjson, clean_text

# Test with just a few websites
TEST_TARGETS = [
    "https://python.org",
    "https://github.com",
    "https://stackoverflow.com"
]

def test_crawler():
    """Test crawler with a few URLs"""
    print("Testing ProXplore Crawler...")
    print(f"Testing with {len(TEST_TARGETS)} websites\n")
    
    success_count = 0
    
    for url in TEST_TARGETS:
        try:
            print(f"Testing: {url}")
            headers = {'User-Agent': 'ProXplore-Test/1.0'}
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            title = soup.title.string if soup.title else url
            
            # Strip tags
            for script in soup(["script", "style"]):
                script.decompose()
            text = clean_text(soup.get_text())
            
            # Format NDJSON
            ndjson = format_ndjson(title, url, text[:500])
            
            print(f"  ✓ Title: {title[:50]}")
            print(f"  ✓ Content length: {len(text)} chars")
            print(f"  ✓ NDJSON formatted: {len(ndjson)} bytes\n")
            
            success_count += 1
            time.sleep(1)
            
        except Exception as e:
            print(f"  ✗ Error: {e}\n")
    
    print(f"{'='*60}")
    print(f"Test Results: {success_count}/{len(TEST_TARGETS)} successful")
    print(f"{'='*60}")
    
    return success_count == len(TEST_TARGETS)

if __name__ == "__main__":
    result = test_crawler()
    exit(0 if result else 1)
