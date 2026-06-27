import feedparser

from config import USER_AGENT


def fetch_feed(url: str):
    """
    Download and parse a single RSS feed.
    Returns a feedparser object.
    """

    return feedparser.parse(
        url,
        agent=USER_AGENT,
    )