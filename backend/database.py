"""
Database Module for ProXplore
Handles JSON escaping and NDJSON formatting
"""

import json
import re

def escape_json(text):
    """
    Escapes special characters for JSON strings
    
    Args:
        text (str): Input string to escape
        
    Returns:
        str: JSON-escaped string
    """
    # Using json.dumps handles all escaping automatically
    return json.dumps(text)[1:-1]  # Remove surrounding quotes


def format_ndjson(title, url, content):
    """
    Formats a search result entry as a single NDJSON line
    
    Args:
        title (str): Page title
        url (str): Page URL
        content (str): Page content (cleaned text)
        
    Returns:
        str: NDJSON formatted line
    """
    result = {
        "title": title,
        "url": url,
        "content": content
    }
    return json.dumps(result, ensure_ascii=False)


def clean_text(text):
    """
    Cleans text by removing extra whitespace and normalizing
    
    Args:
        text (str): Input text
        
    Returns:
        str: Cleaned text
    """
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text)
    # Remove leading/trailing whitespace
    text = text.strip()
    return text
