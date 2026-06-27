import re
from bs4 import BeautifulSoup


def clean_html(text: str) -> str:
    if not text:
        return ""

    return BeautifulSoup(text, "html.parser").get_text(" ", strip=True)


def clean_text(text: str) -> str:
    if not text:
        return ""

    text = re.sub(r"\s+", " ", text)

    return text.strip()