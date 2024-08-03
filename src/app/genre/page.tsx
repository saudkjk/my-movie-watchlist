"use server";
import genres from "@/lib/genres.json";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchMoviesByGenreWithDbStatus } from "@/lib/actions/API";
import PageTitle from "@/components/PageTitle";
import DisplayInfiniteMovies from "@/components/DisplayInfiniteMovies";
import GenreNav from "@/components/GenreNav";
import GenreFilter from "@/components/GenreFilter";

type PageProps = {
  searchParams: {
    genre: string;
    sortBy: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const genre = searchParams.genre || "Action";
  const sortBy = searchParams.sortBy || "popularity.desc";

  const currentUserId = (await auth().userId) || "";

  const genreId = genres.find(
    (g) => g.name.toLowerCase() === genre.toLowerCase(),
  )?.id;
  if (!genreId) redirect("/");

  const genreMovies = await fetchMoviesByGenreWithDbStatus(
    String(genreId),
    1,
    currentUserId,
    sortBy,
  );
  const fetchMoviesWithDbStatus = fetchMoviesByGenreWithDbStatus;
  const param = String(genreId);
  const title = genre.charAt(0).toUpperCase() + genre.slice(1);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title={title} />
        <GenreFilter>
          <GenreNav />
        </GenreFilter>
      </div>
      <DisplayInfiniteMovies
        movies={genreMovies}
        param={param}
        fetchMoviesWithDbStatus={fetchMoviesWithDbStatus}
        currentUserId={currentUserId}
        sortBy={sortBy}
      />
    </>
  );
}
