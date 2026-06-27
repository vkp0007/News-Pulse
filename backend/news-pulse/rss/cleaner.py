import re


def clean_article_text(text: str, source: str) -> str:
    """
    Clean extracted article text by removing common boilerplate.
    """

    if not text:
        return ""

    # Common boilerplate
    patterns = [
        r"Continue reading.*",
        r"Read more.*",
        r"Related articles.*",
        r"Related stories.*",
        r"Most viewed.*",
        r"Advertisement.*",
        r"Copyright.*",
        r"Follow us.*",
        r"Share this article.*",
    ]

    # Remove newsletter blocks that appear inside articles
    text = re.sub(
        r"Sign up for.*?newsletter.*?(?=\n\n|\Z)",
        "",
        text,
        flags=re.IGNORECASE | re.DOTALL,
    )

    # Remove common boilerplate
    for pattern in patterns:
        text = re.sub(
            pattern,
            "",
            text,
            flags=re.IGNORECASE,
        )

    # Normalize whitespace
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]+", " ", text)

    return text.strip()