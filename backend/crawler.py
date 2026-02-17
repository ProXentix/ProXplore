"""
ProXplore Web Crawler
Crawls popular tech websites and stores content in NDJSON format
"""

import requests
import time
import sys
from bs4 import BeautifulSoup
from database import format_ndjson, clean_text


# Target websites to crawl
TARGETS = [
    # Priority 1: Required Sites
    "https://proxentix.in",
    "https://proxpl.in",
    
    # Priority 2: 50+ Tech Websites
    "https://stackoverflow.com",
    "https://github.com",
    "https://dev.to",
    "https://reactjs.org",
    "https://python.org",
    "https://rubyonrails.org",
    "https://go.dev",
    "https://rust-lang.org",
    "https://nodejs.org",
    "https://deno.land",
    "https://aws.amazon.com",
    "https://cloud.google.com",
    "https://azure.microsoft.com",
    "https://firebase.google.com",
    "https://vercel.com",
    "https://netlify.com",
    "https://heroku.com",
    "https://digitalocean.com",
    "https://docker.com",
    "https://kubernetes.io",
    "https://linux.org",
    "https://ubuntu.com",
    "https://debian.org",
    "https://archlinux.org",
    "https://mozilla.org",
    "https://w3schools.com",
    "https://developer.mozilla.org",
    "https://css-tricks.com",
    "https://smashingmagazine.com",
    "https://alistapart.com",
    "https://freecodecamp.org",
    "https://codecademy.com",
    "https://udemy.com",
    "https://coursera.org",
    "https://edx.org",
    "https://pluralsight.com",
    "https://hackernoon.com",
    "https://techcrunch.com",
    "https://theverge.com",
    "https://wired.com",
    "https://arstechnica.com",
    "https://engadget.com",
    "https://venturebeat.com",
    "https://gizmodo.com",
    "https://lifehacker.com",
    "https://mashable.com",
    "https://zdnet.com",
    "https://cnet.com",
    "https://pcgamer.com",
    "https://tomshardware.com",
    "https://anandtech.com"
]


def strip_tags(html):
    """
    Strips HTML tags and extracts clean text
    
    Args:
        html (str): HTML content
        
    Returns:
        str: Clean text without HTML tags
    """
    try:
        soup = BeautifulSoup(html, 'html.parser')
        
        # Remove script and style elements
        for script in soup(["script", "style", "nav", "footer", "header"]):
            script.decompose()
        
        # Get text
        text = soup.get_text()
        
        # Clean text
        return clean_text(text)
    except Exception as e:
        print(f"Error stripping tags: {e}")
        return ""


def fetch_content(url):
    """
    Fetches content from a URL
    
    Args:
        url (str): URL to fetch
        
    Returns:
        tuple: (html_content, title) or (None, None) on error
    """
    try:
        print(f"Fetching: {url}")
        
        headers = {
            'User-Agent': 'ProXplore-Crawler/1.0 (Educational Search Engine)',
            'Accept': 'text/html,application/xhtml+xml',
            'Accept-Language': 'en-US,en;q=0.9',
        }
        
        response = requests.get(url, headers=headers, timeout=10, allow_redirects=True)
        response.raise_for_status()
        
        html_content = response.text
        
        # Extract title
        soup = BeautifulSoup(html_content, 'html.parser')
        title = soup.title.string if soup.title else url
        title = clean_text(title) if title else url
        
        return html_content, title
        
    except requests.exceptions.Timeout:
        print(f"Timeout fetching: {url}")
        return None, None
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None, None
    except Exception as e:
        print(f"Unexpected error fetching {url}: {e}")
        return None, None


def main():
    """Main crawler function"""
    print("Starting ProXplore Crawler...")
    print(f"Crawling {len(TARGETS)} websites...\n")
    
    indexed_count = 0
    failed_count = 0
    
    try:
        with open('index.json', 'w', encoding='utf-8') as output_file:
            for idx, url in enumerate(TARGETS):
                # Politeness: Wait 1 second between requests
                if idx > 0:
                    time.sleep(1)
                
                # Fetch content
                html_content, title = fetch_content(url)
                
                if html_content:
                    # Clean content
                    text_content = strip_tags(html_content)
                    
                    # Limit content size (first 5000 chars for memory efficiency)
                    if len(text_content) > 5000:
                        text_content = text_content[:5000]
                    
                    # Save to NDJSON
                    ndjson_line = format_ndjson(title, url, text_content)
                    output_file.write(ndjson_line + '\n')
                    
                    indexed_count += 1
                    print(f"✓ Indexed [{idx + 1}/{len(TARGETS)}]: {url}")
                else:
                    failed_count += 1
                    print(f"✗ Failed [{idx + 1}/{len(TARGETS)}]: {url}")
        
        print(f"\n{'='*60}")
        print(f"Crawling Complete!")
        print(f"Successfully indexed: {indexed_count}")
        print(f"Failed: {failed_count}")
        print(f"Data saved to: index.json")
        print(f"{'='*60}")
        
    except KeyboardInterrupt:
        print("\n\nCrawling interrupted by user.")
        sys.exit(0)
    except Exception as e:
        print(f"\nFatal error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
