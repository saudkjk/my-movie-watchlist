"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlOptionsVertical } from "react-icons/sl";
import React from "react";
import { MovieCardProps } from "@/lib/types/types";
import genres from "@/lib/genres.json";
import AddToListButtonWrapper from "../add-to-list-components/AddToListButtonWrapper";
import { Button } from "../ui/button";
import { FaBookmark, FaCheck, FaPlus, FaRegBookmark } from "react-icons/fa6";
import { CompletedListButtonWrapper } from "./CompletedListButtonWrapper";
import { BsHandThumbsDownFill, BsHandThumbsUpFill } from "react-icons/bs";
import { WatchlistButton } from "./WatchlistButton";

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

function MovieCard({ movie, userId, username }: MovieCardProps) {
  const [showChildren, setShowChildren] = useState(false);

  // let imageURL = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  // if (imageURL.endsWith("null")) imageURL = "/posterPlaceHolder.jpg";

  return (
    <article className="flex flex-col gap-1">
      <div className="group relative flex flex-col">
        <Image
          src={getImageUrl(movie.poster_path!)}
          width={3000}
          height={2000}
          style={{
            objectFit: "cover",
          }}
          alt={movie.title}
          className={`rounded-lg object-contain transition sm:group-hover:brightness-75 ${showChildren ? "brightness-75 sm:brightness-100" : "brightness-100"}`}
          sizes="(min-width: 1540px) 248px, (min-width: 1280px) calc(10vw + 96px), (min-width: 1040px) calc(25vw - 36px), (min-width: 780px) calc(33.33vw - 43px), calc(49.13vw - 53px)"
        />

        <div
          className={`absolute top-1 w-full transform text-white transition-opacity duration-500 ease-out sm:group-focus-within:opacity-100 sm:group-hover:opacity-100 ${
            showChildren
              ? "opacity-100 sm:opacity-0"
              : "pointer-events-none opacity-0 sm:pointer-events-auto"
          }`}
        >
          <div className="flex w-full justify-around py-2">
            <AddToListButtonWrapper
              userId={userId!}
              movie={movie}
              username={username!}
              triggerComponent={
                <Button className="h-[34px] rounded-full bg-slate-900/60 px-[10px] transition-colors duration-300 ease-in-out hover:scale-110 hover:bg-slate-700/60 active:bg-slate-500/60">
                  <FaPlus className="text-white" />
                </Button>
              }
            />

            <CompletedListButtonWrapper
              movie={movie}
              userId={userId!}
              triggerButton={
                <Button className="h-[34px] rounded-full bg-slate-900/60 px-[10px] transition-colors duration-300 ease-in-out hover:scale-110 hover:bg-slate-700/60 active:bg-slate-500/60">
                  <FaCheck className="text-white" />
                </Button>
              }
              dislikedButton={
                <div className="cursor-pointer rounded-full bg-slate-900/60 p-2 transition-colors duration-300 ease-in-out hover:scale-110 hover:bg-slate-700/60 active:bg-slate-500/60">
                  <BsHandThumbsDownFill className="text-red-600" />
                </div>
              }
              likedButton={
                <div className="cursor-pointer rounded-full bg-slate-900/60 p-2 transition-colors duration-300 ease-in-out hover:scale-110 hover:bg-slate-700/60 active:bg-slate-500/60">
                  <BsHandThumbsUpFill className="text-green-500" />
                </div>
              }
            />
            <WatchlistButton
              movie={movie}
              userId={userId!}
              inWatchlistButton={
                <div className="flex h-[34px] w-[34px] cursor-pointer items-center rounded-full bg-slate-900/60 px-[10px] transition-colors duration-300 ease-in-out hover:scale-110 hover:bg-slate-700/60 active:bg-slate-500/60">
                  <FaBookmark
                    className="text-green-500"
                    aria-label="Remove from watchlist"
                  />
                </div>
              }
              notInWatchlistButton={
                <div className="flex h-[34px] w-[34px] cursor-pointer items-center rounded-full bg-slate-900/60 px-[10px] transition-colors duration-300 ease-in-out hover:scale-110 hover:bg-slate-700/60 active:bg-slate-500/60">
                  <FaRegBookmark
                    className="text-white"
                    aria-label="Add to watchlist"
                  />
                </div>
              }
            />
          </div>
        </div>
        <button
          className="absolute bottom-[70px] right-1 rounded-full bg-slate-900/60 p-2 text-white transition-colors duration-300 ease-in-out hover:scale-110 hover:bg-slate-700/60 active:bg-slate-500/60 sm:hidden"
          onClick={() => setShowChildren(!showChildren)}
        >
          {showChildren ? (
            <SlOptionsVertical className="rotate-90 transform transition-transform duration-300 ease-in-out" />
          ) : (
            <SlOptionsVertical className="rotate-0 transform transition-transform duration-300 ease-in-out" />
          )}
        </button>
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
          {getGenreNames(
            movie.genre_ids || movie.genres!.map((g) => g.id) || [],
          )}
        </p>
      </div>
    </article>
  );
}

export default React.memo(MovieCard);
