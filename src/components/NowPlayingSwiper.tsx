"use client";
import { Movie } from "@/lib/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "@/app/globals.css";
import { Navigation } from "swiper/modules";
// import { CompletedButton } from "./movie-card-components/CompletedButton";
import { YouTubeEmbed } from "@next/third-parties/google";
import Link from "next/link";

type MovieCardSwiperProps = {
  movies: Movie[];
  userId: string;
};

export default function NowPlayingSwiper({
  movies,
  userId,
}: MovieCardSwiperProps) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={20}
      slidesPerView="auto"
      className="swiper-wrapper"
      slidesPerGroupAuto
    >
      {movies.map((movie, index) => (
        <SwiperSlide
          key={movie.id}
          className={`flex w-[320px] flex-col items-center justify-center md:w-[384px] ${
            index === 0 ? "ml-0 md:ml-2" : ""
          }`}
        >
          <div className="relative h-auto w-[320px] overflow-hidden rounded-md md:w-[384px]">
            <YouTubeEmbed videoid="Idh8n5XuYIA" />
          </div>
          <div className="mt-2 flex items-center justify-start gap-2 text-center">
            {/* <div className="mt-2 flex items-start justify-start">
              <WatchlistButton userId={userId} movie={movie} />
              <CompletedButton userId={userId} movie={movie} />
            </div> */}
            <Link
              className="truncate whitespace-nowrap text-sm font-semibold"
              href={`/movie/${movie.id}`}
            >
              {movie.title}
            </Link>
          </div>
          {/* <div className="mt-2 flex">
            <WatchlistButton userId={userId} movie={movie} />
            <CompletedButton userId={userId} movie={movie} />
          </div> */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
