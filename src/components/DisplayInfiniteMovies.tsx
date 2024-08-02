"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import MovieCard from "./MovieCard";
import Image from "next/image";
import { DisplayInfiniteMoviesProps, Movie } from "@/types/types";
let page = 2;

export default function DisplayInfiniteMovies({
  movies,
  param,
  fetchMoviesWithDbStatus,
  currentUserId,
}: DisplayInfiniteMoviesProps) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<Movie[]>(movies);

  const fetchMoreMovies = useCallback(async () => {
    const newMovies = await fetchMoviesWithDbStatus(param, page, currentUserId);
    setData([...data, ...newMovies]);
    page += 1;
  }, [param, currentUserId, fetchMoviesWithDbStatus, data]);

  useEffect(() => {
    if (inView) {
      const delay = 200;
      const timeoutId = setTimeout(() => fetchMoreMovies(), delay);
      return () => clearTimeout(timeoutId);
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
      <div ref={ref} className="flex w-full items-center justify-center">
        <Image
          src="/spinner.svg"
          alt="spinner"
          width={56}
          height={56}
          className="mb-10 mt-5 object-contain"
        />
      </div>
    </>
  );
}
