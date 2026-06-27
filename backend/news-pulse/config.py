from dotenv import load_dotenv

load_dotenv()

RSS_FEEDS = {
    "BBC": "https://www.bbc.com/news/rss.xml",
    "NPR": "https://feeds.npr.org/1001/rss.xml",
    "AlJazeera": "https://www.aljazeera.com/xml/rss/all.xml",
    
}

REQUEST_TIMEOUT = 15

MAX_WORKERS = 12

USER_AGENT = (
    "NewsPulse/1.0"
)