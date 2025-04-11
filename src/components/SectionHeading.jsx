const SectionHeading = ({ title }) => {
    return (
        <>
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <div className="w-20 h-1 bg-indigo-500 mb-8"></div>
        </>
    );
};

export default SectionHeading;