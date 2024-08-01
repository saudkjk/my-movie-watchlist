"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import MovieCard from "./MovieCard";
import Image from "next/image";
import { DisplayInfiniteMoviesProps } from "@/types/types";
let page = 2;

export default function DisplayInfiniteMovies({
  movies,
  param,
  fetchMoviesWithDbStatus,
  currentUserId,
}: DisplayInfiniteMoviesProps) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<any[]>(movies); 

  useEffect(() => {
    if (inView) {
      const delay = 300;
      const timeoutId = setTimeout(() => {
        fetchMoviesWithDbStatus(param, page, currentUserId).then((res) => {
          setData([...data, ...res]);
          page += 1;
        });
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [inView, param, currentUserId, fetchMoviesWithDbStatus, data]);

  return (
    <div>
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

      <section className="flex w-full items-center justify-center">
        <div ref={ref}>
          <Image
            src="/spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="mb-10 mt-5 object-contain"
          />
        </div>
      </section>
    </div>
  );
}
