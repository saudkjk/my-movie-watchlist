"use client";
import React, { useState } from "react";
import HeroMovieCarousel from "@/components/hero-components/HeroMovieCarousel";
import HeroMovieInfo from "@/components/hero-components/HeroMovieInfo";
import HeroDesktopActions from "@/components/hero-components/HeroDesktopActions";
import HeroMobileActions from "@/components/hero-components/HeroMobileActions";
import { Movie } from "@/lib/types/types";

type HeroProps = {
  movies: Movie[];
  userId: string;
  username: string;
};

const Hero: React.FC<HeroProps> = ({ movies, userId, username }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mb-[25px] w-full md:mb-[50px]">
      <div className="flex items-end overflow-hidden md:items-center">
        <div className="relative w-full">
          <HeroMovieCarousel
            movies={movies}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>

        <div className="absolute z-10 m-2 mx-[4%] flex flex-col items-start justify-center md:mx-[8%] md:w-[50%] md:gap-[0px] lg:w-[440px]">
          <HeroMovieInfo movie={movies[activeIndex]} />
          <div className="hidden md:block">
            <HeroDesktopActions
              userId={userId}
              movie={movies[activeIndex]}
              username={username}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-black/30 md:hidden">
        <HeroMobileActions
          userId={userId}
          movie={movies[activeIndex]}
          username={username}
        />
      </div>
    </div>
  );
};

export default Hero;
