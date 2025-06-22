const SkeletonCard = () => {
  return (
    <div className="w-96 h-[500px] bg-gray-100 animate-pulse rounded-lg p-4 border border-gray-200">
      <div className="w-full h-64 bg-gray-300 rounded mb-4" />
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-full mb-2" />
      <div className="h-4 bg-gray-300 rounded w-5/6 mb-4" />
      <div className="flex justify-end space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div className="w-10 h-10 rounded-full bg-gray-300" />
      </div>
    </div>
  );
};

export default SkeletonCard;
