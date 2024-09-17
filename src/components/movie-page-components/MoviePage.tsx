import { Movie } from "@/lib/types/types";
import Image from "next/image";
import MoviePageMovieInfo from "./MoviePageMovieInfo";
import MoviePageDesktopActions from "./MoviePageDesktopActions";
import MoviePageMobileActions from "./MoviePageMobileActions";

type MoviePageProps = {
  movie: Movie;
  userId: string;
  username: string;
};

const MoviePage: React.FC<MoviePageProps> = ({ movie, userId, username }) => {
  return (
    <div className="mb-[25px] w-full md:mb-[50px]">
      <div className="flex items-end overflow-hidden lg:items-center">
        <div className="relative flex max-h-[100vh] w-[100vw] items-center justify-center overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="Description"
            width={3000}
            height={2000}
            className="object-cover object-center brightness-75"
          />
        </div>

        <div className="absolute z-10 m-2 mx-[4%] flex flex-col items-start justify-center md:mx-[8%] md:gap-[0px] lg:w-[520px]">
          <MoviePageMovieInfo movie={movie} />
          <div className="hidden w-full md:flex">
            <MoviePageDesktopActions
              userId={userId}
              movie={movie}
              username={username}
            />
          </div>
        </div>

        <div className="absolute right-0 z-10 hidden h-[30vw] max-h-[600px] w-[20vw] max-w-[400px] flex-col items-start justify-center md:mx-[8%] lg:flex">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="Description"
            fill
            className="rounded-[20px] object-cover object-center brightness-90"
          />
        </div>
      </div>
      <div className="flex flex-col bg-black/30 md:hidden">
        <p
          key={movie.overview}
          className="animate-fade-in-up mx-[4%] mb-0 mt-1 translate-y-10 transform text-sm opacity-0 delay-200"
        >
          {movie.overview}
        </p>
        <MoviePageMobileActions
          userId={userId}
          movie={movie}
          username={username}
        />
      </div>
    </div>
  );
};

export default MoviePage;
