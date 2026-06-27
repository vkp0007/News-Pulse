import useCluster from "../../hooks/useCluster";
import ArticleCard from "./ArticleCard";

const ClusterDetails = ({ clusterId }) => {
    const {
        cluster,
        loading,
        error,
    } = useCluster(clusterId);

    if (!clusterId) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 h-full">
                <h2 className="text-xl font-semibold mb-4">
                    Cluster Details
                </h2>

                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                    <div className="text-5xl mb-4">📰</div>

                    <p className="font-medium text-lg">
                        No Cluster Selected
                    </p>

                    <p className="text-sm mt-2 text-center">
                        Click a topic on the timeline to explore related
                        articles.
                    </p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6">
                Loading cluster...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 text-red-600">
                {error}
            </div>
        );
    }

    if (!cluster) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 h-full">

            {/* Header */}
            <div className="border-b pb-4">

                <h2 className="text-2xl font-bold">
                    {cluster.label}
                </h2>

                <div className="mt-4 text-sm text-slate-600 space-y-2">

                    <p>
                        <strong>Articles:</strong>{" "}
                        {cluster.articleCount}
                    </p>

                    <p>
                        <strong>Time Window:</strong>{" "}
                        {new Date(cluster.startTime).toLocaleString()}{" "}
                        →{" "}
                        {new Date(cluster.endTime).toLocaleString()}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">

                        {cluster.sources.map(source => (
                            <span
                                key={source}
                                className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium"
                            >
                                {source}
                            </span>
                        ))}

                    </div>

                </div>

            </div>

            {/* Articles */}
            <div className="mt-6">

                <h3 className="text-lg font-semibold mb-4">
                    Related Articles
                </h3>

                <div className="space-y-4 max-h-150 overflow-y-auto pr-2">

                    {cluster.articles.map(article => (
                        <ArticleCard
                            key={article._id}
                            article={article}
                        />
                    ))}

                </div>

            </div>

        </div>
    );
};

export default ClusterDetails;