import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MovieCardProps } from "@/lib/types/types";
import genres from "@/lib/genres.json";

const getImageUrl = (path: string) =>
  `https://image.tmdb.org/t/p/original/${path}`;

const getGenreNames = (genreIds: number[]) => {
  return genreIds
    .map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : null;
    })
    .filter(Boolean)
    .join(", ");
};

function TopMovieCard({ movie, index }: MovieCardProps) {
  let imageURL = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  if (imageURL.endsWith("null")) imageURL = "/posterPlaceHolder.jpg";

  return (
    <article className="relative flex flex-col gap-1 rounded-lg bg-black bg-opacity-50 p-3">
      <div className="group relative flex flex-col">
        <Image
          src={getImageUrl(movie.poster_path!)}
          width={270}
          height={180}
          style={{
            objectFit: "cover",
          }}
          alt={movie.title}
          className={`rounded-lg object-contain transition`}
          sizes="(min-width: 1540px) 248px, (min-width: 1280px) calc(10vw + 96px), (min-width: 1040px) calc(25vw - 36px), (min-width: 780px) calc(33.33vw - 43px), calc(49.13vw - 53px)"
        />

        <div className="bg-lightblue absolute inset-0 m-0 flex resize items-center justify-center overflow-hidden p-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="relative font-bold leading-none text-black/60">
              <div
                className={`drop-shadow-md ${index! + 1 === 10 ? "text-[140px]" : "text-[220px]"} relative`}
                style={{
                  WebkitTextStroke: "2px rgba(255, 255, 255, 0.05)",
                }}
              >
                {index! + 1}
              </div>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-0.5 px-1 font-bold">
        <Link
          href={`/movie/${movie.id}`}
          className="line-clamp-1 text-base hover:text-main-color"
        >
          {movie.title}
        </Link>
        <div className="flex items-center gap-2">
          <img src="/tmdb.svg" alt="" className="w-[70px]" />
          <span className="text-xs font-medium">
            {Math.round((movie.vote_average / 10) * 100)}%
          </span>
        </div>
        <p className="line-clamp-1 text-xs text-gray-400">
          {getGenreNames(movie.genre_ids!)}
        </p>
      </div>
    </article>
  );
}

export default TopMovieCard;
