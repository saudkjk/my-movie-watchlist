import React from "react";

const MoviesCardSkeleton: React.FC = () => {
  return (
    <section className="mx-[4%] mb-[25px] md:mx-[8%] md:mb-[50px]">
      <div className="mb-[20px] mt-2 h-8 w-[10%] min-w-[120px] animate-pulse rounded bg-gray-600"></div>
      <div className="relative mb-[15px] flex w-full gap-4 md:mb-[20px]">
        <div className="grid w-full grid-cols-2 gap-4 gap-y-[25px] sm:grid-cols-3 md:grid-cols-4 md:gap-y-[50px] lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="w-full">
              <div className="relative h-0 w-[100%] animate-pulse overflow-hidden rounded-md bg-gray-700 pb-[150%]"></div>
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

export default MoviesCardSkeleton;
