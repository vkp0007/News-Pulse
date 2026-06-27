import Article from "../models/article.model.js";
import Cluster from "../models/cluster.model.js";

import runPythonPipeline from "./pythonService.js";

const ingestService = async () => {

  const data = await runPythonPipeline();

  // Remove previous ingestion
  await Cluster.deleteMany({});
  await Article.deleteMany({});

  // Remove duplicate articles (same URL)
  data.articles = [
    ...new Map(
      data.articles.map(article => [
        article.url,
        article,
      ])
    ).values(),
  ];

  const articleMap = new Map();

  let insertedArticles = 0;

  // Save Articles
  for (const article of data.articles) {

    const savedArticle = await Article.create({

      title: article.title,
      summary: article.summary,
      content: article.content,
      url: article.url,
      source: article.source,
      publishedAt: article.published_at,

    });

    articleMap.set(article.url, savedArticle);

    insertedArticles++;

  }

  let insertedClusters = 0;

  // Save Clusters
  for (const cluster of data.clusters) {

    const articleIds = new Set();

    for (const article of cluster.articles) {

      const savedArticle = articleMap.get(article.url);

      if (savedArticle) {
        articleIds.add(savedArticle._id.toString());
      }

    }

    const savedCluster = await Cluster.create({

      label: cluster.label,

      articleCount: articleIds.size,

      startTime: cluster.start_time,

      endTime: cluster.end_time,

      sources: [
        ...new Set(
          cluster.articles.map(article => article.source)
        ),
      ],

      articles: [...articleIds],

    });

    insertedClusters++;

    await Article.updateMany(
      {
        _id: {
          $in: [...articleIds],
        },
      },
      {
        $set: {
          cluster: savedCluster._id,
        },
      }
    );

  }

  return {

    articlesProcessed: data.articles.length,

    articlesInserted: insertedArticles,

    articlesSkipped: 0,

    clustersCreated: insertedClusters,

  };

};

export default ingestService;