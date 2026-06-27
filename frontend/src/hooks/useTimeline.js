import { useEffect, useState } from "react";
import api from "../services/api";

const useTimeline = () => {

    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [source, setSource] = useState("");

    const fetchTimeline = async (selectedSource = source) => {

        try {

            setLoading(true);

            let url = "/clusters/timeline";

            if (selectedSource) {
                url += `?source=${selectedSource}`;
            }

            const { data } = await api.get(url);

            setTimeline(data.timeline);
            setError("");

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTimeline(source);

    }, [source]);

    return {
        timeline,
        loading,
        error,
        source,
        setSource,
        fetchTimeline,
    };

};

export default useTimeline;