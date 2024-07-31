"use server";
import DisplayMovies from "@/components/DisplayMovies";
import { fetchMoviesByQuery } from "@/lib/API";
import { auth } from "@clerk/nextjs/server";
import PaginationControls from "@/components/PaginationControls";
import PageTitle from "@/components/PageTitle";

type PageProps = {
  searchParams: {
    query: string;
    page: number;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const query = searchParams.query || "";
  const page = searchParams.page || 1;

  const currentUserId = await auth().userId;
  const searchedMovies = await fetchMoviesByQuery(query, page);
  return (
    <>
      {searchedMovies && searchedMovies.length > 0 && (
        <div>
          <PageTitle title={`Search results for: "${query}"`} />
          <DisplayMovies
            movies={searchedMovies}
            currentUserId={currentUserId!}
          />
          <PaginationControls />
        </div>
      )}
      {searchedMovies && searchedMovies.length === 0 && (
        <PageTitle title="No Results" />
      )}
    </>
  );
}
