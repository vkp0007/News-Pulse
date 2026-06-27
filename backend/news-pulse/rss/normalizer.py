from models.article import Article

from utils.helpers import clean_html
from utils.dates import parse_date


def is_valid_article(title: str, summary: str, url: str) -> bool:
    """
    Filter out newsletter pages, live pages, videos,
    audio posts and other non-article content.
    """

    text = f"{title} {summary}".lower()

    invalid_patterns = [
        # Videos / Audio
        "watch:",
        "listen:",
        "live:",

        # Newsletter pages
        "sign up for",
        "newsletter",
        "our free",
        "weekly email",
        "daily email",

        # Promotional pages
        "continue reading",
        "subscribe to",
        "subscribe for",
    ]

    # Skip newsletter signup URLs
    if "newsletter" in url.lower():
        return False

    return not any(pattern in text for pattern in invalid_patterns)


def normalize_entry(entry, source):
    """
    Convert RSS entry into our internal Article model.
    """

    title = entry.get("title", "").strip()

    summary = clean_html(
        entry.get("summary", "")
    ).strip()

    url = entry.get("link", "").strip()

    # Skip invalid entries
    if not is_valid_article(title, summary, url):
        return None

    published_at = parse_date(
        entry.get("published")
        or entry.get("updated")
    )

    return Article(
        title=title,
        summary=summary,
        url=url,
        source=source,
        published_at=published_at,
    )