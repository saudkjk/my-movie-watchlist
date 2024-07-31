"use server";
import React from "react";
import { ImageHover } from "./ImageHover";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WatchlistButton } from "@/components/WatchlistButton";
import { CompletedButton } from "@/components/CompletedButton";

import Link from "next/link";

type MovieCardProps = {
  currentUserId: string;
  movie: any;
  isLCP: boolean;
};

export default async function MovieCard({
  movie,
  currentUserId,
  isLCP,
}: MovieCardProps) {
  let imageURL = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  if (imageURL.endsWith("null")) imageURL = "/posterPlaceHolder.jpg";
  // const imageURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBgFZfYsQAAAAASUVORK5CYII="

  return (
    <div className="m-1 flex h-80 w-60 p-3">
      <ImageHover imageUrl={imageURL} isLCP={isLCP}>
        <p className="text-xl font-bold">
          <Link
            href={`https://www.google.com/search?q=${movie.title}&newwindow=1`}
            target="_blank"
            className="hover:text-emerald-400"
          >
            {movie.title}
          </Link>
        </p>
        <p className="text-sm font-normal">
          Duration: {movie.runtime ? `${movie.runtime} minutes` : "N/A"}
          <br />
          Rating: {movie.vote_average.toFixed(1)}
        </p>
        <TooltipProvider>
          <div className="mb-2 mt-1 flex">
            <WatchlistButton currentUserId={currentUserId} movie={movie} />
            <CompletedButton currentUserId={currentUserId} movie={movie} />
          </div>
        </TooltipProvider>
      </ImageHover>
    </div>
  );
}
