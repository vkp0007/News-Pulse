from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

from models.article import Article


@dataclass
class Cluster:

    id: int
    label: str
    articles: list[Article] = field(default_factory=list)

    article_count: int = 0

    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

    def to_dict(self):

        return {
            "id": self.id,
            "label": self.label,
            "article_count": self.article_count,
            "start_time": self.start_time.isoformat() if self.start_time else None,
            "end_time": self.end_time.isoformat() if self.end_time else None,
            "articles": [
                article.to_dict()
                for article in self.articles
            ]
        }