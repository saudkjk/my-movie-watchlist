"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectFade } from "swiper/modules";
import "swiper/css/thumbs";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "@/app/globals.css";
import "swiper/react";
import { Movie } from "@/lib/types/types";

const getImageUrl = (path: string) =>
  `https://image.tmdb.org/t/p/original/${path}`;

type MovieCardSwiperProps = {
  movies: Movie[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const HeroMovieCarousel: React.FC<MovieCardSwiperProps> = ({
  movies,
  activeIndex,
  setActiveIndex,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
    if (thumbsSwiper) {
      thumbsSwiper.slideTo(swiper.activeIndex);
    }
  };

  return (
    <div className="relative flex items-center justify-end">
      <div className="relative h-full max-h-[80vh] w-full">
        <>
          <Swiper
            className="mySwiper2"
            slidesPerView={1}
            modules={[Thumbs, Navigation, EffectFade]}
            navigation={{
              nextEl: ".hero-swiper-next",
              prevEl: ".hero-swiper-prev",
            }}
            effect="fade"
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            onSlideChange={handleSlideChange}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.title}>
                <div className="aspect-w-16 aspect-h-9 relative max-h-[80vh]">
                  <img
                    src={getImageUrl(movie.backdrop_path!)}
                    alt={movie.title}
                    className="object-cover brightness-90 transition duration-700"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute right-[8%] top-[30%] hidden h-[70%] w-[230px] lg:block">
            <Swiper
              className="mySwiper group h-full w-full"
              spaceBetween={0}
              slidesPerView={3}
              direction="vertical"
              onSwiper={setThumbsSwiper}
              modules={[Thumbs]}
              breakpoints={{
                1400: {
                  slidesPerView: 4,
                },
              }}
            >
              <div className="hero-swiper-prev absolute right-[8%] top-[0%] z-50 -mr-5 hidden w-[235px] bg-black/40 opacity-0 transition-all duration-300 ease-in-out hover:bg-black/60 group-hover:opacity-100 lg:block">
                <button className="px-[110px] text-white transition-transform duration-300 ease-in-out hover:scale-110">
                  <div className="rotate-90 text-4xl">&lt;</div>
                </button>
              </div>
              <div className="hero-swiper-next absolute bottom-[0%] right-[8%] z-50 -mr-5 hidden w-[235px] bg-black/40 opacity-0 transition-all duration-300 ease-in-out hover:bg-black/60 group-hover:opacity-100 lg:block">
                <button className="px-[110px] text-white transition-transform duration-300 ease-in-out hover:scale-110">
                  <div className="rotate-90 text-4xl">&gt;</div>
                </button>
              </div>
              {movies.map((movie, index) => (
                <SwiperSlide key={movie.title} className="h-[125px] w-[230px]">
                  <img
                    src={getImageUrl(movie.backdrop_path!)}
                    alt={movie.title}
                    className={`cursor-pointer border-[3px] border-white brightness-90 transition duration-700 ${
                      index === activeIndex
                        ? "border-opacity-100"
                        : "border-0 border-opacity-0"
                    }`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      </div>
    </div>
  );
};

export default HeroMovieCarousel;
