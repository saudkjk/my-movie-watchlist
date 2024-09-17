import ActorCardCarousel from "@/components/ActorCardCarousel";
import MoviesCardCarousel from "@/components/movie-card-components/MoviesCardCarousel";
import MoviePage from "@/components/movie-page-components/MoviePage";
import TrailerPlayer from "@/components/TrailerPlayer";
import {
  fetchMovieCredits,
  fetchSimilarMovies,
  getMovieByIdWithDbStatus,
  getTrailerUrl,
} from "@/lib/actions/API";
import { getUserInfo } from "@/lib/helpers";

type MovieInfoProps = {
  params: {
    movie_id: string;
  };
};

export default async function MovieInfoPage({ params }: MovieInfoProps) {
  const { userId, username } = await getUserInfo();
  const { movie_id } = params;
  const movie = await getMovieByIdWithDbStatus(movie_id, userId);
  const credits = await fetchMovieCredits(movie_id);
  const trailerUrl = await getTrailerUrl(Number(movie_id));
  const similarMovies = await fetchSimilarMovies(movie_id, userId);

  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center">
        Movie not found.
      </div>
    );
  }

  return (
    <>
      <MoviePage movie={movie} userId={userId} username={username} />

      <ActorCardCarousel actors={credits.cast.slice(0, 20)} title={`Cast`} />

      <TrailerPlayer trailerUrl={trailerUrl!} title="Watch Trailer" />

      <MoviesCardCarousel
        movies={similarMovies}
        userId={userId}
        username={username}
        title="Similar"
      />
    </>
  );
}
