"use server";
import DisplayMovies from "@/components/DisplayMovies";
import PageTitle from "@/components/PageTitle";
import { fetchMoviesByGenre, fetchMoviesTopTrending } from "@/lib/API";
import { updateWithDatabaseStatus } from "@/lib/database";
import { auth } from "@clerk/nextjs/server";
import genres from "@/lib/genres.json";
import PaginationControls from "@/components/PaginationControls";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: {
    genre: string;
    page: number;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const genre = searchParams.genre;
  const page = searchParams.page;

  const currentUserId = await auth().userId;

  let genreMovies;
  let title;

  if (genre === "toprated") {
    genreMovies = await fetchMoviesTopTrending("toprated", page);
    title = "Top Rated";
  } else if (genre === "trending") {
    genreMovies = await fetchMoviesTopTrending("trending", page);
    title = "Trending";
  } else {
    // Find the genre ID from the genre name
    const genreId = genres.genres.find(
      (g) => g.name.toLowerCase() === genre.toLowerCase(),
    )?.id;
    if (!genreId) redirect("/");

    genreMovies = await fetchMoviesByGenre(genreId!, page);
    title = genre.charAt(0).toUpperCase() + genre.slice(1);
  }

  return (
    <>
      <PageTitle title={title} />
      <DisplayMovies movies={genreMovies} currentUserId={currentUserId!} />
      <PaginationControls />
    </>
  );
}
