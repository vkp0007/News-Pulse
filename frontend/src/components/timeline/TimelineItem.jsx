const TimelineItem = ({
    cluster,
    timelineStart,
    timelineEnd,
    selected,
    onClick,
}) => {

    const start = new Date(cluster.startTime).getTime();
    const end = new Date(cluster.endTime).getTime();

    const total = timelineEnd - timelineStart || 1;

    const left =
        ((start - timelineStart) / total) * 100;

    const width =
        Math.max(
            ((end - start) / total) * 100,
            1
        );

    const sameTime = start === end;

    const formatTime = (date) =>
        new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

    return (

        <div className="grid grid-cols-12 gap-6 items-start">

            {/* Topic */}

            <div className="col-span-3">

                <h3
                    className="font-semibold truncate"
                    title={cluster.label}
                >
                    {cluster.label}
                </h3>

                <p className="text-sm text-slate-500">
                    {cluster.articleCount} articles
                </p>

            </div>

            {/* Timeline */}

            <div className="col-span-9">

                <div className="relative">

                    {/* Background */}

                    <div className="h-3 rounded-full bg-slate-200" />

                    {/* Active Window */}

                    <button

                        onClick={onClick}

                        title={cluster.label}

                        style={{
                            left: `${left}%`,
                            width: sameTime
                                ? "14px"
                                : `${width}%`,
                        }}

                        className={`
                            absolute
                            top-0
                            h-3
                            rounded-full
                            transition-all
                            duration-200

                            ${
                                selected
                                    ? "bg-blue-700"
                                    : "bg-blue-500 hover:bg-blue-600"
                            }
                        `}
                    />

                    {/* Time Labels */}

                    <div
                        className="absolute text-[11px] text-slate-500 mt-2"
                        style={{
                            left: `${left}%`,
                            transform: "translateX(-50%)",
                        }}
                    >
                        {formatTime(cluster.startTime)}
                    </div>

                    {!sameTime && (

                        <div
                            className="absolute text-[11px] text-slate-500 mt-2"
                            style={{
                                left: `${left + width}%`,
                                transform: "translateX(-50%)",
                            }}
                        >
                            {formatTime(cluster.endTime)}
                        </div>

                    )}

                </div>

            </div>

        </div>

    );

};

export default TimelineItem;