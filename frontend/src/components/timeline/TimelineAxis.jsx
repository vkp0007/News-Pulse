const TimelineAxis = ({ start, end }) => {

    const ticks = 6;
    const total = end - start;

    return (

        <div className="mb-8">

            {/* Labels */}

            <div className="relative h-14">

                {Array.from({ length: ticks + 1 }).map((_, index) => {

                    const value =
                        start + (total * index) / ticks;

                    const left =
                        (index / ticks) * 100;

                    let alignment =
                        "-translate-x-1/2";

                    if (index === 0) {
                        alignment = "translate-x-0";
                    } else if (index === ticks) {
                        alignment = "-translate-x-full";
                    }

                    return (

                        <div
                            key={index}
                            className={`absolute ${alignment}`}
                            style={{ left: `${left}%` }}
                        >

                            <div className="text-center whitespace-nowrap">

                                <div className="text-xs font-semibold text-slate-700">

                                    {new Date(value).toLocaleDateString([], {
                                        month: "short",
                                        day: "numeric",
                                    })}

                                </div>

                                <div className="text-xs text-slate-500">

                                    {new Date(value).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

            {/* Timeline */}

            <div className="relative h-6">

                <div className="absolute top-2 left-0 right-0 h-0.5 bg-slate-300 rounded-full" />

                {Array.from({ length: ticks + 1 }).map((_, index) => {

                    const left =
                        (index / ticks) * 100;

                    return (

                        <div
                            key={index}
                            className="absolute top-0 -translate-x-1/2"
                            style={{ left: `${left}%` }}
                        >

                            <div className="w-0.5 h-5 bg-slate-400" />

                        </div>

                    );

                })}

            </div>

        </div>

    );

};

export default TimelineAxis;