from dataclasses import dataclass, asdict
from datetime import datetime
from typing import Optional


@dataclass
class Article:
    title: str
    summary: str
    url: str
    source: str
    published_at: Optional[datetime]

    # Filled by extractor.py
    content: str = ""

    # Filled by preprocess.py
    processed_text: str = ""

    # Filled by clustering.py
    cluster_id: Optional[int] = None

    def to_dict(self):
        data = asdict(self)

        if self.published_at:
            data["published_at"] = self.published_at.isoformat()

        return data