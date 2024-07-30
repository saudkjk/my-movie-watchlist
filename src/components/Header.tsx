"use server";
import SearchForm from "./SearchForm";
import React from "react";
import Navbar from "./Navbar";

export default async function Header() {
  return (
    <div className="pt-2 md:mb-5">
      <Navbar></Navbar>

      <div className="hidden flex-col items-center pt-3 font-bold md:flex md:text-4xl lg:text-6xl">
        My Movie
        <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          Watchlist
        </span>
        <div className="relative h-6 w-[40rem]">
          <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
          <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="absolute inset-x-60 top-0 h-[2px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
          <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        </div>
      </div>

      <SearchForm />
    </div>
  );
}
