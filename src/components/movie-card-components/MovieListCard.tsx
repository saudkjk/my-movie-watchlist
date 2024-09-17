import React from "react";
import Image from "next/image";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";
import { MovieListCardProps } from "@/lib/types/types";
import Link from "next/link";

const getImageUrl = (path: string) =>
  `https://image.tmdb.org/t/p/original/${path}`;

const MovieListCard: React.FC<MovieListCardProps> = ({ movieList }) => {
  return (
    <Link key={movieList.id} href={"/list/" + movieList.id}>
      <div className="mx-auto flex max-w-[400px] flex-col gap-4 rounded-lg bg-[#464646] p-3 shadow-lg">
        <div className="relative flex flex-row">
          {movieList.listItems.slice(0, 3).map((movie, index) => (
            <div
              key={index}
              className={`relative ${
                index === 0
                  ? "z-10"
                  : index === 1
                    ? "z-20 -ml-16"
                    : "z-30 -ml-16"
              }`}
            >
              <Image
                src={getImageUrl(movie.moviePoster)}
                width={180}
                height={240}
                style={{
                  objectFit: "cover",
                }}
                alt={movie.id}
                className="rounded-lg object-contain"
                sizes="(min-width: 1540px) 248px, (min-width: 1280px) calc(10vw + 96px), (min-width: 1040px) calc(25vw - 36px), (min-width: 780px) calc(33.33vw - 43px), calc(49.13vw - 53px)"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-2">
          <h3 className="text-xl font-bold">{movieList.name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-gray-400">{movieList.username}</p>
            <p className="flex items-center gap-1 text-gray-400">
              <BiSolidCommentDetail />
              {movieList.comments.length}
            </p>
            <p className="flex items-center gap-1 text-gray-400">
              <FaHeart className="mb-0.5" />
              {movieList.likes.length}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieListCard;
