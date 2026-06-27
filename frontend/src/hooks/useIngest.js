import { useState } from "react";
import api from "../services/api";

const useIngest = (onComplete) => {

    const [loading, setLoading] = useState(false);

    const triggerIngestion = async () => {

        try {

            setLoading(true);

            const { data } = await api.post("/ingest/trigger");

            const jobId = data.jobId;

            pollStatus(jobId);

        } catch (error) {

            console.error(error);

            setLoading(false);

        }

    };

    const pollStatus = (jobId) => {

        const interval = setInterval(async () => {

            try {

                const { data } = await api.get(
                    `/ingest/status/${jobId}`
                );

                const status = data.job.status;

                if (status === "completed") {

                    clearInterval(interval);

                    setLoading(false);

                    onComplete();

                }

                if (status === "failed") {

                    clearInterval(interval);

                    setLoading(false);

                    alert("Ingestion Failed");

                }

            } catch (err) {

                clearInterval(interval);

                setLoading(false);

            }

        }, 2000);

    };

    return {

        loading,

        triggerIngestion,

    };

};

export default useIngest;