"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import MovieCard from "@/components/MovieCard";
import Image from "next/image";
import { DisplayInfiniteMoviesProps, Movie } from "@/lib/types/types";
let page = 2;

export default function DisplayInfiniteMovies({
  movies,
  fetchMoviesWithDbStatus,
  param,
  currentUserId,
  sortBy,
}: DisplayInfiniteMoviesProps) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<Movie[]>(movies);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreMovies = useCallback(async () => {
    const newMovies = await fetchMoviesWithDbStatus(
      param,
      page,
      currentUserId,
      sortBy,
    );
    setData([...data, ...newMovies]);
    page += 1;
    setIsLoading(false);
  }, [param, currentUserId, fetchMoviesWithDbStatus, data]);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      fetchMoreMovies();
    }
  }, [inView]);

  useEffect(() => {
    setData(movies);
  }, [movies]);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {data.map((movie, index) => (
          <div key={movie.id}>
            <MovieCard
              movie={movie}
              currentUserId={currentUserId}
              isLCP={index === 0}
            />
          </div>
        ))}
      </div>
      <div ref={ref}></div>
      {data.length !== 0 ? (
        isLoading && (
          <div className="flex w-full items-center justify-center">
            <Image
              src="/spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="mb-10 mt-5 object-contain"
            />
          </div>
        )
      ) : (
        <div className="mt-4 text-center text-lg">
          No Results
          <div className="text-md">please remove some filters</div>
        </div>
      )}
    </>
  );
}
