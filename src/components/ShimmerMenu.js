import React from "react";

const ShimmerMenu = () => {
  return (
    
    <div className="animate-pulse flex mt-20 ml-36 pl-24 space-x-4">
      <div className="rounded-lg bg-gray-300 h-52 w-80"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default ShimmerMenu;