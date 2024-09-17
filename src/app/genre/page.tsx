import genres from "@/lib/genres.json";
import { redirect } from "next/navigation";
import {
  fetchMoviesByGenreWithDbStatus,
  fetchMoviesGeneralWithDbStatus,
} from "@/lib/actions/API";
import DisplayInfiniteMovies from "@/components/DisplayInfiniteMovies";
import GenreFilter from "@/components/filter-components/GenreFilter";
import MovieFilter from "@/components/filter-components/MovieFilter";
import { getUserInfo } from "@/lib/helpers";

type PageProps = {
  searchParams: {
    genre: string;
    sort: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const genre = searchParams.genre;
  const sortBy = searchParams.sort || "popularity.desc";
  const { userId, username } = await getUserInfo();

  let genreMovies, param, fetchMoviesWithDbStatus;

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
      userId,
      sortBy,
    );
    fetchMoviesWithDbStatus = fetchMoviesByGenreWithDbStatus;
    param = genreIdsStr;
  } else {
    genreMovies = await fetchMoviesGeneralWithDbStatus(
      "movies",
      userId,
      sortBy,
    );
    fetchMoviesWithDbStatus = fetchMoviesGeneralWithDbStatus;
    param = "movies";
  }

  return (
    <>
      <div className="mx-[4%] mb-[15px] md:mx-[8%]">
        <MovieFilter>
          <GenreFilter />
        </MovieFilter>
        <DisplayInfiniteMovies
          movies={genreMovies}
          fetchMoviesWithDbStatus={fetchMoviesWithDbStatus}
          param={param}
          userId={userId}
          sortBy={sortBy}
          username={username}
        />
      </div>
    </>
  );
}
