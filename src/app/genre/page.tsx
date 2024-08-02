"use server";
import { auth } from "@clerk/nextjs/server";
import { fetchMoviesAndPageInfo } from "@/lib/API";
import PageTitle from "@/components/PageTitle";
import DisplayInfiniteMovies from "@/components/DisplayInfiniteMovies";

type PageProps = {
  searchParams: {
    genre: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const genre = searchParams.genre;

  const currentUserId = (await auth().userId) || "";

  const { genreMovies, title, param, fetchMoviesWithDbStatus } =
    await fetchMoviesAndPageInfo(genre, currentUserId);

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
