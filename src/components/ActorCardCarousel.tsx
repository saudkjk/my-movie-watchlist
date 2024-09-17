"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ActorCard from "./ActorCard";
import "swiper/swiper-bundle.css";

function ActorCardCarousel({ actors, title }: { actors: any; title: string }) {
  return (
    <section className="mx-[4%] mb-[25px] md:mx-[8%] md:mb-[50px]">
      <h2 className="mb-[15px] text-xl font-semibold text-gray-100 md:mb-[20px] md:text-2xl">
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
          {actors.map((actor: any) => (
            <SwiperSlide
              key={actor.id}
              className="flex w-[180px] justify-center"
            >
              <ActorCard actor={actor} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default ActorCardCarousel;
