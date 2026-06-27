import re

from nltk.corpus import stopwords

CUSTOM_STOPWORDS = {
    "watch",
    "live",
    "video",
    "videos",
    "photo",
    "photos",
    "image",
    "images",
    "analysis",
    "explained",
    "explainer",
    "breaking",
    "latest",
    "update",
    "updates",
    "report",
    "reports",
    "reported",
    "says",
    "say",
    "told",
    "news",
    "published",
    "continue",
    "bbc",
    "npr",
    "aljazeera",
}

STOPWORDS = set(stopwords.words("english"))
STOPWORDS = STOPWORDS.union(CUSTOM_STOPWORDS)


def preprocess(article):
    """
    Create cleaned text for TF-IDF clustering.
    """

    # Give the title higher importance
    text = " ".join([
        article.title,
        article.title,
        article.summary,
        article.content
    ])

    text = text.lower()

    # Keep only alphabets
    text = re.sub(r"[^a-zA-Z\s]", " ", text)

    # Remove multiple spaces
    text = re.sub(r"\s+", " ", text)

    words = []

    for word in text.split():

        if (
            word not in STOPWORDS
            and len(word) > 2
        ):
            words.append(word)

    return " ".join(words)