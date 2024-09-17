"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { DisplayInfiniteMoviesProps, Movie } from "@/lib/types/types";
import MovieCard from "./movie-card-components/MovieCard";
let page = 2;

export default function DisplayInfiniteMovies({
  movies,
  fetchMoviesWithDbStatus,
  param,
  userId: userId,
  sortBy,
  username,
}: DisplayInfiniteMoviesProps) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<Movie[]>(movies);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreMovies = useCallback(async () => {
    const newMovies = await fetchMoviesWithDbStatus(
      param,
      userId,
      sortBy,
      page,
    );
    setData([...data, ...newMovies]);
    page += 1;
    setIsLoading(false);
  }, [param, userId, fetchMoviesWithDbStatus, data]);

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
      <div className="grid grid-cols-2 gap-x-4 gap-y-[50px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {data.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            userId={userId}
            username={username}
          />
        ))}
      </div>
      <div ref={ref}></div>
      {data.length !== 0 ? (
        <div className="flex w-full items-center justify-center">
          <Image
            src="/spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="mb-10 mt-5 object-contain"
          />
        </div>
      ) : (
        <div className="mt-4 text-center text-lg">
          No Results for {param}
          <div className="text-md">please remove some filters</div>
        </div>
      )}
    </>
  );
}
