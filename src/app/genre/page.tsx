"use server";
import PageTitle from "@/components/PageTitle";
import {
  fetchMoviesByGenreWithDbStatus,
  fetchMoviesTopTrendingWithDbStatus,
} from "@/lib/API";
import { auth } from "@clerk/nextjs/server";
import genresData from "@/lib/genres.json";
import { redirect } from "next/navigation";
import DisplayInfiniteMovies from "@/components/DisplayInfiniteMovies";

type PageProps = {
  searchParams: {
    genre: string;
  };
};

const movieGenres = genresData.genres;

export default async function Page({ searchParams }: PageProps) {
  const genre = searchParams.genre;

  const currentUserId = (await auth().userId) || "";

  let genreMovies, title;
  let param = genre;
  let fetchMoviesWithDbStatus = fetchMoviesTopTrendingWithDbStatus;

  if (genre === "toprated" || genre === "trending") {
    genreMovies = await fetchMoviesTopTrendingWithDbStatus(
      genre,
      1,
      currentUserId,
    );
    title = genre === "toprated" ? "Top Rated" : "Trending";
  } else {
    // Find the genre ID from the genre name
    const genreId = movieGenres.find(
      (g) => g.name.toLowerCase() === genre.toLowerCase(),
    )?.id;
    if (!genreId) redirect("/");

    genreMovies = await fetchMoviesByGenreWithDbStatus(
      String(genreId),
      1,
      currentUserId,
    );
    fetchMoviesWithDbStatus = fetchMoviesByGenreWithDbStatus;
    param = String(genreId);
    title = genre.charAt(0).toUpperCase() + genre.slice(1);
  }

  return (
    <>
      <PageTitle title={title} />
      <DisplayInfiniteMovies
        movies={genreMovies}
        param={param}
        fetchMoviesWithDbStatus={fetchMoviesWithDbStatus}
        currentUserId={currentUserId}
      />
    </>
  );
}
