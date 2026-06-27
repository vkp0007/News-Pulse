from models.article import Article

import requests
import trafilatura
import sys

from config import REQUEST_TIMEOUT, USER_AGENT
from rss.cleaner import clean_article_text

DEBUG = False


def enrich_article(article: Article) -> Article:
    """
    Download and extract article content.
    """

    try:

        response = requests.get(
            article.url,
            headers={
                "User-Agent": USER_AGENT,
            },
            timeout=REQUEST_TIMEOUT,
        )

        response.raise_for_status()

        response.encoding = response.apparent_encoding

        extracted_text = trafilatura.extract(
            response.text,
            favor_precision=True,
            include_comments=False,
            include_tables=False,
            include_links=False,
            include_images=False,
            deduplicate=True,
        ) or ""

        article.content = clean_article_text(
            extracted_text,
            article.source,
        )

        if DEBUG:

            print("=" * 80, file=sys.stderr)
            print(article.source, file=sys.stderr)
            print(article.title, file=sys.stderr)

            print("\nExtracted Length:", len(extracted_text), file=sys.stderr)
            print("Cleaned Length:", len(article.content), file=sys.stderr)

            print("\nFirst 500 characters:\n", file=sys.stderr)
            print(article.content[:500], file=sys.stderr)

    except Exception as e:

        if DEBUG:
            print(f"Extraction Error: {e}", file=sys.stderr)

        article.content = ""

    return article