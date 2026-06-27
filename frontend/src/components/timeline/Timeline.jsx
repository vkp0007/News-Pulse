import TimelineAxis from "./TimelineAxis";
import TimelineItem from "./TimelineItem";

const Timeline = ({
    timeline,
    selectedClusterId,
    onSelect,
}) => {

    if (!timeline.length) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6">
                No timeline available.
            </div>
        );
    }

    const sortedTimeline = [...timeline].sort(
        (a, b) =>
            new Date(a.startTime) -
            new Date(b.startTime)
    );

    const timelineStart = Math.min(
        ...sortedTimeline.map(cluster =>
            new Date(cluster.startTime).getTime()
        )
    );

    const timelineEnd = Math.max(
        ...sortedTimeline.map(cluster =>
            new Date(cluster.endTime).getTime()
        )
    );

    return (

        <div className="bg-white rounded-xl shadow-sm p-6">

            {/* Header */}

            <div className="flex items-start justify-between mb-8">

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        News Timeline
                    </h2>

                    <p className="text-slate-500 mt-1">

                        {new Date(timelineStart).toLocaleString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}

                        {" → "}

                        {new Date(timelineEnd).toLocaleString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}

                    </p>

                </div>

                <div className="text-right">

                    <div className="text-4xl font-bold text-blue-600">
                        {timeline.length}
                    </div>

                    <div className="text-slate-500">
                        Topics
                    </div>

                </div>

            </div>

            {/* Column Headers */}

            <div className="grid grid-cols-12 gap-6 mb-3">

                <div className="col-span-3">

                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Topic
                    </h3>

                </div>

                <div className="col-span-9">

                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Activity Timeline
                    </h3>

                </div>

            </div>

            {/* Axis */}

            <div className="grid grid-cols-12 gap-6 mb-8">

                <div className="col-span-3" />

                <div className="col-span-9">

                    <TimelineAxis
                        start={timelineStart}
                        end={timelineEnd}
                    />

                </div>

            </div>

            {/* Timeline Items */}

            <div className="space-y-8">

                {sortedTimeline.map(cluster => (

                    <TimelineItem
                        key={cluster.id}
                        cluster={cluster}
                        timelineStart={timelineStart}
                        timelineEnd={timelineEnd}
                        selected={
                            cluster.id === selectedClusterId
                        }
                        onClick={() =>
                            onSelect(cluster.id)
                        }
                    />

                ))}

            </div>

        </div>

    );

};

export default Timeline;