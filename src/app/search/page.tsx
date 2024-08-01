"use server";
import { fetchMoviesByQueryWithDbStatus } from "@/lib/API";
import { auth } from "@clerk/nextjs/server";
import PageTitle from "@/components/PageTitle";
import DisplayInfiniteMovies from "@/components/DisplayInfiniteMovies";

type PageProps = {
  searchParams: {
    query: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const query = searchParams.query || "";

  const currentUserId = await auth().userId;
  const searchedMovies = await fetchMoviesByQueryWithDbStatus(
    query,
    1,
    currentUserId!,
  );
  return (
    <>
      {searchedMovies && searchedMovies.length > 0 && (
        <div>
          <PageTitle title={`Search results for: "${query}"`} />
          <DisplayInfiniteMovies
            movies={searchedMovies}
            param={query}
            fetchMoviesWithDbStatus={fetchMoviesByQueryWithDbStatus}
            currentUserId={currentUserId!}
          />
        </div>
      )}
      {searchedMovies && searchedMovies.length === 0 && (
        <PageTitle title="No Results" />
      )}
    </>
  );
}
