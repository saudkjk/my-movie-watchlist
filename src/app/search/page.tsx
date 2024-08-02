"use server";
import { auth } from "@clerk/nextjs/server";
import { fetchMoviesByQueryWithDbStatus } from "@/lib/API";
import PageTitle from "@/components/PageTitle";
import DisplayInfiniteMovies from "@/components/DisplayInfiniteMovies";

type PageProps = {
  searchParams: {
    query: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const query = searchParams.query || "";

  const currentUserId = (await auth().userId) || "";
  const searchedMovies = await fetchMoviesByQueryWithDbStatus(
    query,
    1,
    currentUserId,
  );
  return (
    <>
      {searchedMovies && searchedMovies.length > 0 && (
        <>
          <PageTitle title={`Search results for: "${query}"`} />
          <DisplayInfiniteMovies
            movies={searchedMovies}
            param={query}
            fetchMoviesWithDbStatus={fetchMoviesByQueryWithDbStatus}
            currentUserId={currentUserId}
          />
        </>
      )}
      {searchedMovies && searchedMovies.length === 0 && (
        <PageTitle title="No Results" />
      )}
    </>
  );
}
