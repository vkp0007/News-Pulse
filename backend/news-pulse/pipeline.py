import json
import sys
from concurrent.futures import ThreadPoolExecutor

# Force UTF-8 output
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

from config import MAX_WORKERS
from rss.feeds import get_feeds
from rss.parser import fetch_feed
from rss.normalizer import normalize_entry
from rss.extractor import enrich_article

from clustering.preprocess import preprocess
from clustering.tfidf_cluster import cluster_articles


def fetch_articles():
    """
    Fetch and normalize articles from all RSS feeds.
    Removes duplicate articles based on URL.
    """

    articles = []

    seen_urls = set()

    for source, url in get_feeds().items():

        feed = fetch_feed(url)

        for entry in feed.entries:

            article = normalize_entry(entry, source)

            if not article:
                continue

            # Skip duplicate URLs
            if article.url in seen_urls:
                continue

            seen_urls.add(article.url)

            articles.append(article)

    return articles

def enrich_articles(articles):
    """
    Download full article content in parallel.
    """
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        return list(executor.map(enrich_article, articles))


def preprocess_articles(articles):
    """
    Generate cleaned text for clustering.
    """
    for article in articles:
        article.processed_text = preprocess(article)

    return articles


def build_pipeline():
    """
    Complete ingestion + clustering pipeline.
    """

    articles = fetch_articles()

    articles = enrich_articles(articles)

    articles = preprocess_articles(articles)

    clusters = cluster_articles(articles)

    return {
        "articles": articles,
        "clusters": clusters,
    }


def export_json(result):
    """
    Convert dataclass objects to JSON-serializable dicts.
    """

    return {
        "articles": [
            article.to_dict()
            for article in result["articles"]
        ],
        "clusters": [
            cluster.to_dict()
            for cluster in result["clusters"]
        ]
    }


def main(json_output=False):

    result = build_pipeline()

    if json_output:

        payload = json.dumps(
            export_json(result),
            ensure_ascii=False,
        )

        # Write UTF-8 bytes directly
        sys.stdout.buffer.write(payload.encode("utf-8"))

    else:

        print(f"Articles : {len(result['articles'])}")
        print(f"Clusters : {len(result['clusters'])}")

        print("\nFirst 10 Clusters:\n")

        for cluster in result["clusters"][:10]:

            print("=" * 60)

            print(f"Cluster ID : {cluster.id}")
            print(f"Label      : {cluster.label}")
            print(f"Articles   : {cluster.article_count}")

            print()

            for article in cluster.articles:

                print(f"[{article.source}] {article.title}")

            print()


if __name__ == "__main__":

    json_mode = "--json" in sys.argv

    main(json_output=json_mode)

