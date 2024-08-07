"use client";
import { Movie } from "@/lib/types/types";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, FreeMode } from "swiper/modules";
type MovieCardSwiperProps = {
  movies: Movie[];
  currentUserId: string;
  isRecommendations?: boolean;
};

export default function MovieCardSwiper({
  movies,
  currentUserId,
  isRecommendations = false,
}: MovieCardSwiperProps) {
  return (
    <Swiper
      spaceBetween={15}
      slidesPerView={2}
      slidesPerGroup={1}
      rewind={true}
      freeMode={true}
      navigation
      modules={[Navigation, FreeMode]}
      breakpoints={{
        640: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          slidesPerGroup: isRecommendations ? 1 : 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          slidesPerGroup: isRecommendations ? 1 : 5,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 6,
          slidesPerGroup: isRecommendations ? 0 : 6,
          spaceBetween: 20,
        },
      }}
    >
      {movies.map((movie, index) => (
        <SwiperSlide key={movie.id}>
          <MovieCard
            movie={movie}
            currentUserId={currentUserId}
            isLCP={index === 0}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
