const sources = [
    "",
    "BBC",
    "NPR",
    "AlJazeera",
];

const SourceFilter = ({
    value,
    onChange,
}) => {

    return (

        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="
                border
                rounded-lg
                px-4
                py-2
                bg-white
                text-slate-700
            "
        >

            <option value="">
                All Sources
            </option>

            {sources.slice(1).map(source => (

                <option
                    key={source}
                    value={source}
                >
                    {source}
                </option>

            ))}

        </select>

    );

};

export default SourceFilter;