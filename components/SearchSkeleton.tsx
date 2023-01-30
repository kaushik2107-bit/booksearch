import React from "react";

function SearchSkeleton() {
  return (
    <div className="flex justify-center bg-gray-400 py-4">
      <div className="grid lg:grid-cols-2 grid-cols-1 md:w-[80vw] lg:w-[70vw] w-[90vw] gap-2 grid-rows-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number, index: any) => (
          <div
            className="h-20 flex items-center space-x-2 bg-gray-500 animate-pulse rounded-[5px] p-[4px]"
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default SearchSkeleton;
