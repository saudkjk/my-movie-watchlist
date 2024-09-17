"use client";
import ReactPlayer from "react-player";

interface TrailerPlayerProps {
  trailerUrl: string;
  title: string;
}

export default function TrailerPlayer({
  trailerUrl,
  title,
}: TrailerPlayerProps) {
  return (
    <div>
      <h2 className="mx-[4%] mb-[15px] text-xl font-semibold text-gray-100 md:mx-[8%] md:mb-[20px] md:text-2xl">
        {title}
      </h2>
      <div className="mx-auto mb-[50px] w-[90%] justify-center overflow-hidden rounded-xl md:w-[80%]">
        <div className="aspect-video justify-center">
          {trailerUrl ? (
            <ReactPlayer url={trailerUrl} controls width="100%" height="100%" />
          ) : (
            <p className="text-center text-white">Trailer not available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
