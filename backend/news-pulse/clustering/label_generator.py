import re

STOPWORDS = {
    "the", "a", "an", "to", "of", "in", "on",
    "for", "with", "after", "and", "or",
    "at", "by", "from", "over", "into",
    "live", "watch", "video", "photos",
    "photo", "breaking"
}


def clean_title(title: str) -> str:
    """
    Convert an article title into a short readable cluster label.
    """

    title = re.sub(r"\s+", " ", title).strip()

    # Remove trailing source suffixes
    title = re.sub(r"\s*[-|:]\s*(bbc|cnn|reuters|ap|guardian).*",
                   "",
                   title,
                   flags=re.I)

    words = title.split()

    cleaned = []

    for word in words:

        lower = word.lower()

        if lower in STOPWORDS:
            continue

        cleaned.append(word)

        if len(cleaned) == 6:
            break

    return " ".join(cleaned)


def generate_label(articles):

    if not articles:
        return "News Topic"

    # Choose the representative article
    representative = max(
        articles,
        key=lambda article: len(article.title)
    )

    return clean_title(representative.title)