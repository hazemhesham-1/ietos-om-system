const Spinner = () => {
    return (
        <div role="status">
            <span className="border-4 border-slate-100 border-t-slate-700 rounded-full size-8 block animate-spin"/>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Spinner;