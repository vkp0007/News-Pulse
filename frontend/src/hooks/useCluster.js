import { useEffect, useState } from "react";
import api from "../services/api";

const useCluster = (clusterId) => {

    const [cluster, setCluster] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!clusterId) {

            setCluster(null);
            return;
        }

        fetchCluster();

    }, [clusterId]);

    const fetchCluster = async () => {

        try {

            setLoading(true);

            const { data } = await api.get(
                `/clusters/${clusterId}`
            );

            setCluster(data.cluster);

            setError("");

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }

    };

    return {

        cluster,

        loading,

        error,

    };

};

export default useCluster;