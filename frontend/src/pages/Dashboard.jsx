import { useMemo, useState } from "react";

import useTimeline from "../hooks/useTimeline";
import useIngest from "../hooks/useIngest";

import Timeline from "../components/timeline/Timeline";
import ClusterDetails from "../components/cluster/ClusterDetails";
import RefreshButton from "../components/common/RefreshButton";
import SourceFilter from "../components/common/SourceFilter";

const Dashboard = () => {

    const {
        timeline,
        loading,
        error,
        source,
        setSource,
        fetchTimeline,
    } = useTimeline();

    const [selectedClusterId, setSelectedClusterId] = useState(null);

    const {
        loading: ingestLoading,
        triggerIngestion,
    } = useIngest(() => {

        fetchTimeline();

        setSelectedClusterId(null);

    });

    const handleSourceChange = (value) => {

        setSource(value);

        setSelectedClusterId(null);

    };

    const stats = useMemo(() => {

        const articles = timeline.reduce(
            (sum, cluster) => sum + cluster.articleCount,
            0
        );

        const sources = new Set();

        timeline.forEach(cluster => {
            cluster.sources.forEach(source => sources.add(source));
        });

        return {

            articles,

            topics: timeline.length,

            sources: sources.size,

            lastUpdated:
                timeline.length > 0
                    ? new Date(
                        Math.max(
                            ...timeline.map(cluster =>
                                new Date(cluster.endTime)
                            )
                        )
                    ).toLocaleString()
                    : "--",

        };

    }, [timeline]);

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                Loading timeline...

            </div>

        );

    }

    if (error) {

        return (

            <div className="min-h-screen flex items-center justify-center text-red-600">

                {error}

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-slate-900">

                            News Pulse

                        </h1>

                        <p className="text-slate-500 mt-1">

                            Live News Timeline & Topic Clusters

                        </p>

                    </div>

                    <div className="flex items-center gap-3">

                        <SourceFilter
                            value={source}
                            onChange={handleSourceChange}
                        />

                        <RefreshButton
                            loading={ingestLoading}
                            onRefresh={triggerIngestion}
                        />

                    </div>

                </div>

                {/* Dashboard Stats */}

                <div className="grid grid-cols-4 gap-5 mb-6">

                    <StatCard
                        title="Articles"
                        value={stats.articles}
                    />

                    <StatCard
                        title="Topics"
                        value={stats.topics}
                    />

                    <StatCard
                        title="Sources"
                        value={stats.sources}
                    />

                    <StatCard
                        title="Last Updated"
                        value={stats.lastUpdated}
                    />

                </div>

                {/* Main Layout */}

                <div className="grid grid-cols-12 gap-6">

                    <div className="col-span-9">

                        <Timeline
                            timeline={timeline}
                            selectedClusterId={selectedClusterId}
                            onSelect={setSelectedClusterId}
                        />

                    </div>

                    <div className="col-span-3">

                        <div className="sticky top-6">

                            <ClusterDetails
                                clusterId={selectedClusterId}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

const StatCard = ({ title, value }) => (

    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">

        <p className="text-sm text-slate-500">

            {title}

        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900">

            {value}

        </h2>

    </div>

);

export default Dashboard;