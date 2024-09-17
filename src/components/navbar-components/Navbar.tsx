import React, { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import AuthButtons from "./AuthButtons";
import MobileNav from "./MobileNav";

const NavBar: React.FC = () => {
  return (
    <>
      <div className="flex items-center gap-0 md:gap-4">
        <a href="/">
          <img
            loading="lazy"
            src={`https://cdn.builder.io/api/v1/image/assets/TEMP/b7455439cda4de62a95340ca36c92638191549fc312ca4930a196d319dfe562b?placeholderIfAbsent=true&apiKey=${process.env.NEXT_PUBLIC_IMAGE_KEY}`}
            alt="Logo"
            className="h-auto w-[30px] object-contain"
          />
        </a>

        <a href="/">
          <span className="hidden text-lg font-semibold md:block">
            MyMovieList
          </span>
        </a>
      </div>

      <Suspense>
        <SearchBar />
      </Suspense>

      {/* Sign in and Menu Icon */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex">
          <AuthButtons />
        </div>
        <MobileNav />
      </div>
    </>
  );
};

export default NavBar;
