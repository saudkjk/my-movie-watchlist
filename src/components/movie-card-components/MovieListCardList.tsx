"use client";
import React, { Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import MovieListCard from "./MovieListCard";
import { MovieList } from "@/lib/types/types";

type MovieListCardListProps = {
  title: string;
  movieLists: MovieList[];
};

const MovieListCardList: React.FC<MovieListCardListProps> = ({
  title,
  movieLists,
}) => {
  return (
    <>
      {movieLists && movieLists.length > 0 ? (
        <section className="mx-[4%] mb-[25px] md:mx-[8%] md:mb-[50px]">
          <h2 className="mb-[15px] text-xl font-semibold text-gray-100 md:mb-[20px] md:text-2xl">
            {title}
          </h2>
          <div className="relative flex w-full gap-4">
            <div className="absolute top-1/2 z-10 -ml-12 hidden -translate-y-1/2 transform md:block lg:-ml-16">
              <button className="movie-swiper-prev text-5xl text-white transition-transform duration-300 ease-in-out hover:scale-110">
                &lt;
              </button>
            </div>
            <div className="absolute right-0 top-1/2 z-10 -mr-12 hidden -translate-y-1/2 transform md:block lg:-mr-16">
              <button className="movie-swiper-next text-5xl text-white transition-transform duration-300 ease-in-out hover:scale-110">
                &gt;
              </button>
            </div>
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".movie-swiper-next",
                prevEl: ".movie-swiper-prev",
              }}
              slidesPerView={1}
              spaceBetween={60}
              speed={700}
              slidesPerGroup={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                },
                768: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                1280: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
              }}
              className="flex-1"
            >
              {movieLists.map(
                (list) =>
                  list.listItems.length >= 3 && (
                    <SwiperSlide key={list.id} className="flex justify-center">
                      <MovieListCard movieList={list} />
                    </SwiperSlide>
                  ),
              )}
            </Swiper>
          </div>
        </section>
      ) : (
        <div> No {title} yet</div>
      )}
    </>
  );
};

export default MovieListCardList;
