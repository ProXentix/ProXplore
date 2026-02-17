"""
Sample test data generator for quick testing
Creates a small index.json for testing the server without running full crawler
"""

import json

# Sample test data
test_data = [
    {
        "title": "ProXPL - The ProX Programming Language",
        "url": "https://proxpl.in",
        "content": "ProXPL is a modern programming language designed for system programming and web development. It features strong typing, memory safety, and excellent performance."
    },
    {
        "title": "Proxentix - Technology Solutions",
        "url": "https://proxentix.in",
        "content": "Proxentix provides cutting-edge technology solutions for businesses. We specialize in web development, mobile apps, and cloud infrastructure."
    },
    {
        "title": "Python Programming Language",
        "url": "https://python.org",
        "content": "Python is a high-level, interpreted programming language known for its simplicity and readability. Great for beginners and experts alike."
    },
    {
        "title": "GitHub - Where Software is Built",
        "url": "https://github.com",
        "content": "GitHub is the world's leading software development platform. Millions of developers use GitHub to build, share, and maintain software projects."
    },
    {
        "title": "Stack Overflow - Programming Q&A",
        "url": "https://stackoverflow.com",
        "content": "Stack Overflow is a question and answer site for professional and enthusiast programmers. Get answers to your coding questions."
    },
    {
        "title": "React - JavaScript Library",
        "url": "https://reactjs.org",
        "content": "React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers."
    },
    {
        "title": "Node.js - JavaScript Runtime",
        "url": "https://nodejs.org",
        "content": "Node.js is a JavaScript runtime built on Chrome's V8 engine. It enables server-side JavaScript execution."
    },
    {
        "title": "Docker - Container Platform",
        "url": "https://docker.com",
        "content": "Docker is a platform for developing, shipping, and running applications in containers. Simplify your deployment process."
    }
]

def create_sample_index():
    """Creates a sample index.json file"""
    print("Creating sample index.json...")
    
    with open('index.json', 'w', encoding='utf-8') as f:
        for item in test_data:
            f.write(json.dumps(item, ensure_ascii=False) + '\n')
    
    print(f"✓ Created index.json with {len(test_data)} sample entries")
    print("\nYou can now run: python server.py")

if __name__ == "__main__":
    create_sample_index()
