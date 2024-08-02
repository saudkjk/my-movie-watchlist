"use server";
import SearchForm from "./SearchForm";
import React from "react";
import Navbar from "./Navbar";

export default async function Header() {
  return (
    <div className="pt-2 md:mb-5">
      <Navbar></Navbar>

      <div className="mt-16 hidden flex-col items-center pt-3 font-bold md:flex md:text-4xl lg:mt-20 lg:text-6xl">
        My Movie
        <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          Watchlist
        </span>
      </div>

      <SearchForm />
    </div>
  );
}
