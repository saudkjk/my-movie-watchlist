import React from "react";

const MovieListCardSkeleton: React.FC = () => {
  return (
    <section className="mx-[4%] mb-[25px] md:mx-[8%] md:mb-[50px]">
      <div className="mb-[20px] mt-2 h-8 w-[20%] animate-pulse rounded bg-gray-600"></div>
      <div className="relative mb-[15px] flex w-full gap-4 md:mb-[20px]">
        <div className="grid w-full grid-cols-1 gap-4 gap-y-[25px] md:grid-cols-2 md:gap-y-[50px] lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="w-full">
              <div className="relative h-0 w-[100%] animate-pulse overflow-hidden rounded-md bg-gray-700 pb-[100%]"></div>
              <div className="mt-2 h-4 w-[75%] animate-pulse rounded bg-gray-600"></div>
              <div className="mt-1 h-3 w-[40%] animate-pulse rounded bg-gray-600"></div>
              <div className="mt-1 h-3 w-[50%] animate-pulse rounded bg-gray-600"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieListCardSkeleton;
