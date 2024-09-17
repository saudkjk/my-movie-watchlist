import { fetchMovies } from "@/lib/actions/API";
import {
  getAllPublicCustomLists,
  updateWithDbStatus,
} from "@/lib/actions/database";
import MoviesCardCarousel from "@/components/movie-card-components/MoviesCardCarousel";
import Hero from "@/components/hero-components/Hero";
import TopMoviesCardCarousel from "@/components/movie-card-components/TopMoviesCardCarousel";
import MovieListCardList from "@/components/movie-card-components/MovieListCardList";
import { getUserInfo } from "@/lib/helpers";
export default async function Page() {
  const { userId, username } = await getUserInfo();

  const popularMovies = await fetchMovies("popular", userId);
  const popularMoviesWithDbStatus = await updateWithDbStatus(
    userId,
    popularMovies,
  );

  const publicCustomLists = await getAllPublicCustomLists();

  return (
    <>
      <Hero
        userId={userId}
        movies={popularMoviesWithDbStatus}
        username={username}
      />

      <MoviesCardCarousel
        title={`POPULAR`}
        movies={popularMoviesWithDbStatus}
        userId={userId}
        username={username}
      ></MoviesCardCarousel>

      <TopMoviesCardCarousel
        title={`Top`}
        movies={popularMoviesWithDbStatus.slice(0, 10)}
      ></TopMoviesCardCarousel>

      <MoviesCardCarousel
        title={`POPULAR2`}
        movies={popularMoviesWithDbStatus}
        userId={userId}
        username={username}
      ></MoviesCardCarousel>

      <MovieListCardList
        title={`Popular Movie Lists`}
        movieLists={publicCustomLists}
      ></MovieListCardList>

      <MoviesCardCarousel
        title={`POPULAR3`}
        movies={popularMoviesWithDbStatus}
        userId={userId}
        username={username}
      ></MoviesCardCarousel>

      <MoviesCardCarousel
        title={`POPULAR4`}
        movies={popularMoviesWithDbStatus}
        userId={userId}
        username={username}
      ></MoviesCardCarousel>
    </>
  );
}
