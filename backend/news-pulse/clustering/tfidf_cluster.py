from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from models.cluster import Cluster
from clustering.label_generator import generate_label

SIMILARITY_THRESHOLD = 0.35


def build_similarity_matrix(articles):
    """
    Build TF-IDF vectors and cosine similarity matrix.
    """

    texts = [article.processed_text for article in articles]

    vectorizer = TfidfVectorizer(
        max_features=5000,
        ngram_range=(1, 2),
        min_df=2,
        max_df=0.8,
        sublinear_tf=True,
    )

    tfidf_matrix = vectorizer.fit_transform(texts)

    return cosine_similarity(tfidf_matrix)


def find_clusters(similarity_matrix):
    """
    Find connected components using DFS.
    Returns a list of article index groups.
    """

    n = len(similarity_matrix)

    visited = [False] * n

    clusters = []

    for i in range(n):

        if visited[i]:
            continue

        stack = [i]
        cluster = []

        while stack:

            current = stack.pop()

            if visited[current]:
                continue

            visited[current] = True
            cluster.append(current)

            for j in range(n):

                if (
                    not visited[j]
                    and similarity_matrix[current][j] >= SIMILARITY_THRESHOLD
                ):
                    stack.append(j)

        clusters.append(cluster)

    return clusters


def build_cluster_objects(index_clusters, articles):
    """
    Convert index clusters into Cluster objects.
    """

    cluster_objects = []

    for cluster_id, indices in enumerate(index_clusters, start=1):

        cluster_articles = [articles[i] for i in indices]

        # Assign cluster id to each article
        for article in cluster_articles:
            article.cluster_id = cluster_id

        # Sort chronologically
        cluster_articles.sort(key=lambda x: x.published_at)

        cluster = Cluster(
            id=cluster_id,
            label=generate_label(cluster_articles),
            articles=cluster_articles,
            article_count=len(cluster_articles),
            start_time=cluster_articles[0].published_at,
            end_time=cluster_articles[-1].published_at,
        )

        cluster_objects.append(cluster)

    return cluster_objects


def merge_clusters(cluster_objects):
    """
    Merge highly related clusters using their combined text.
    """

    if len(cluster_objects) <= 1:
        return cluster_objects

    texts = []

    for cluster in cluster_objects:

        text = " ".join(
            article.processed_text
            for article in cluster.articles
        )

        texts.append(text)

    vectorizer = TfidfVectorizer(
        max_features=5000,
        ngram_range=(1, 2),
        sublinear_tf=True,
    )

    matrix = vectorizer.fit_transform(texts)

    similarity = cosine_similarity(matrix)

    visited = [False] * len(cluster_objects)

    merged = []

    new_cluster_id = 1

    MERGE_THRESHOLD = 0.20

    for i in range(len(cluster_objects)):

        if visited[i]:
            continue

        current_articles = list(cluster_objects[i].articles)

        visited[i] = True

        for j in range(i + 1, len(cluster_objects)):

            if visited[j]:
                continue

            if similarity[i][j] >= MERGE_THRESHOLD:

                current_articles.extend(cluster_objects[j].articles)

                visited[j] = True

        current_articles.sort(key=lambda x: x.published_at)

        for article in current_articles:
            article.cluster_id = new_cluster_id

        merged.append(
            Cluster(
                id=new_cluster_id,
                label=generate_label(current_articles),
                articles=current_articles,
                article_count=len(current_articles),
                start_time=current_articles[0].published_at,
                end_time=current_articles[-1].published_at,
            )
        )

        new_cluster_id += 1

    return merged

def cluster_articles(articles):
    """
    Complete clustering pipeline.
    """

    similarity_matrix = build_similarity_matrix(articles)

    index_clusters = find_clusters(similarity_matrix)

    clusters = build_cluster_objects(index_clusters, articles)

    clusters = merge_clusters(clusters)

    return clusters