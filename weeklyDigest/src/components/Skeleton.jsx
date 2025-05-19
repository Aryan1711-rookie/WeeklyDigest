const Skeleton = () => {
    return (
        <div className="flex flex-col space-y-4 p-6 max-w-xl w-full mx-auto">
            <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-full animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-5/6 animate-pulse"></div>
            <div className="h-48 bg-gray-300 rounded animate-pulse"></div>
        </div>
    );
}
export default Skeleton