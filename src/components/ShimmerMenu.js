import React from "react";

const ShimmerMenu = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-lg bg-gray-300 h-52 w-80"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ShimmerMenu;