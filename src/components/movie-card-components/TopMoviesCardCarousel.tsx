"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Movie } from "@/lib/types/types";
import TopMovieCard from "./TopMovieCard";

type TopMoviesCardCarouselProps = {
  title: string;
  movies: Movie[];
};
const getImageUrl = (path: string) =>
  `https://image.tmdb.org/t/p/original/${path}`;

const TopMoviesCardCarousel: React.FC<TopMoviesCardCarouselProps> = ({
  title,
  movies,
}) => {
  return (
    <div className="mb-[25px] md:mb-[50px]">
      <div
        className="py-[20px] md:py-[50px]"
        style={{
          backgroundImage: `url(${getImageUrl(movies[0].backdrop_path!)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="mx-[4%] md:mx-[8%]">
          <h2 className="mb-[20px] text-center text-2xl font-semibold text-gray-100">
            {title}
          </h2>
          <div className="relative flex w-full gap-4">
            <div className="absolute top-1/2 z-10 -ml-12 hidden -translate-y-1/2 transform pb-[60px] md:block lg:-ml-16">
              <button
                className={`${title}-swiper-prev text-5xl text-white transition-transform duration-300 ease-in-out hover:scale-110`}
              >
                &lt;
              </button>
            </div>
            <div className="absolute right-0 top-1/2 z-10 -mr-12 hidden -translate-y-1/2 transform pb-[60px] md:block lg:-mr-16">
              <button
                className={`${title}-swiper-next text-5xl text-white transition-transform duration-300 ease-in-out hover:scale-110`}
              >
                &gt;
              </button>
            </div>
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: `.${title}-swiper-next`,
                prevEl: `.${title}-swiper-prev`,
              }}
              slidesPerView={2}
              spaceBetween={20}
              speed={700}
              slidesPerGroup={2}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                768: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
                1024: {
                  slidesPerView: 5,
                  slidesPerGroup: 5,
                },
                1280: {
                  slidesPerView: 6,
                  slidesPerGroup: 6,
                },
                1536: {
                  slidesPerView: 7,
                  slidesPerGroup: 7,
                },
                1920: {
                  slidesPerView: 8,
                  slidesPerGroup: 8,
                },
              }}
              className="flex-1"
            >
              {movies.map((movie) => (
                <SwiperSlide
                  key={movie.id}
                  className="flex w-[180px] justify-center"
                >
                  <TopMovieCard
                    movie={movie}
                    index={movies.indexOf(movie)}
                    username={""}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMoviesCardCarousel;
