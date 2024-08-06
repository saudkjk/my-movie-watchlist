"use server";
import genres from "@/lib/genres.json";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  fetchMoviesByGenreWithDbStatus,
  fetchMoviesGeneralWithDbStatus,
  fetchMoviesTopOrTrendingWithDbStatus,
} from "@/lib/actions/API";
import DisplayInfiniteMovies from "@/components/DisplayInfiniteMovies";
import MovieFilter from "@/components/MovieFilter";
import GenreFilter from "@/components/filter-components/GenreFilter";

type PageProps = {
  searchParams: {
    genre: string;
    sort: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const genre = searchParams.genre;
  const sortBy = searchParams.sort || "popularity.desc";
  const currentUserId = (await auth().userId) || "";

  let genreMovies, param, title, fetchMoviesWithDbStatus;

  if (genre) {
    // Split genres and find corresponding IDs
    const genreIds = genre
      .split(",")
      .map((g) => {
        const genreObj = genres.find(
          (genre) => genre.name.toLowerCase() === g.toLowerCase(),
        );
        return genreObj ? genreObj.id : null;
      })
      .filter((id) => id !== null);

    if (genreIds.length === 0) redirect("/");

    const genreIdsStr = genreIds.join(",");

    genreMovies = await fetchMoviesByGenreWithDbStatus(
      genreIdsStr,
      1,
      currentUserId,
      sortBy,
    );
    fetchMoviesWithDbStatus = fetchMoviesByGenreWithDbStatus;
    param = genreIdsStr;
  } else {
    genreMovies = await fetchMoviesGeneralWithDbStatus(
      "movies",
      1,
      currentUserId,
      sortBy,
    );
    fetchMoviesWithDbStatus = fetchMoviesGeneralWithDbStatus;
    param = "movies";
  }

  return (
    <>
      <MovieFilter>
        <GenreFilter />
      </MovieFilter>
      <DisplayInfiniteMovies
        movies={genreMovies}
        fetchMoviesWithDbStatus={fetchMoviesWithDbStatus}
        param={param}
        currentUserId={currentUserId}
        sortBy={sortBy}
      />
    </>
  );
}
