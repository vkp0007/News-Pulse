const ArticleCard = ({ article }) => {

    return (

        <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition">

            <div className="flex justify-between items-center mb-3">

                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">

                    {article.source}

                </span>

                <span className="text-xs text-slate-500">

                    {new Date(article.publishedAt).toLocaleString()}

                </span>

            </div>

            <h3 className="text-lg font-semibold text-slate-900">

                {article.title}

            </h3>

            <p className="mt-3 text-slate-600 line-clamp-4">

                {article.summary || article.content}

            </p>

            <div className="mt-5">

                <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
                >

                    Read Original →

                </a>

            </div>

        </div>

    );

};

export default ArticleCard;