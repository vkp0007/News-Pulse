const RefreshButton = ({
    loading,
    onRefresh,
}) => {

    return (

        <button
            onClick={onRefresh}
            disabled={loading}
            className="
                bg-blue-600
                text-white
                px-5
                py-2
                rounded-lg
                hover:bg-blue-700
                disabled:bg-slate-400
            "
        >

            {loading
                ? "Refreshing..."
                : "Refresh Data"}

        </button>

    );

};

export default RefreshButton;