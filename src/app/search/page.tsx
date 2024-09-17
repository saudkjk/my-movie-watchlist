import { fetchMoviesByQueryWithDbStatus } from "@/lib/actions/API";
import DisplayInfiniteMovies from "@/components/DisplayInfiniteMovies";
import { getUserInfo } from "@/lib/helpers";

type PageProps = {
  searchParams: {
    query: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const query = searchParams.query || "";

  const { userId, username } = await getUserInfo();
  const searchedMovies = await fetchMoviesByQueryWithDbStatus(query, userId);
  return (
    <>
      {searchedMovies && searchedMovies.length > 0 ? (
        <div className="mx-[4%] mb-[15px] md:mx-[8%]">
          <h2 className="mb-[20px] text-2xl font-semibold">
            {`Search results for: "${query}"`}
          </h2>
          <DisplayInfiniteMovies
            movies={searchedMovies}
            param={query}
            fetchMoviesWithDbStatus={fetchMoviesByQueryWithDbStatus}
            userId={userId}
            sortBy={"popularity.desc"}
            username={username}
          />
        </div>
      ) : (
        <h2 className="mb-[20px] text-2xl font-semibold">
          {`Search results for: "${query}"`}
        </h2>
      )}
    </>
  );
}
