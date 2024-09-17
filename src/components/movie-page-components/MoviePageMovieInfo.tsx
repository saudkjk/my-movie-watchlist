import { Movie } from "@/lib/types/types";

export default function MoviePageMovieInfo({ movie }: { movie: Movie }) {
  return (
    <>
      <span
        key={movie.title}
        className="translate-y-10 transform animate-fade-in-up text-lg font-semibold opacity-0 md:mb-2 md:text-4xl lg:text-5xl"
      >
        {movie.title}
      </span>
      <div className="mb-1 flex items-center gap-1 md:flex-col md:gap-0">
        <div
          key={movie.vote_average}
          className="flex translate-y-10 transform animate-fade-in-up items-center gap-1 opacity-0 delay-100 md:mb-2 md:gap-2"
        >
          <img
            src="/tmdb.svg"
            alt="Rating"
            className="hidden h-[12px] md:block"
          />

          <span className="text-center text-sm md:text-base">
            {Math.round((movie.vote_average / 10) * 100)}%
          </span>
          <span className="text-sm md:hidden">|</span>
        </div>
        <div className="mb-0 w-full translate-y-10 transform animate-fade-in-up text-sm opacity-0 delay-200 md:mb-1">
          {movie.release_date.split("-")[0]!} | {movie.runtime!} minutes
        </div>
      </div>
      <div className="mb-0 flex flex-wrap gap-2 md:mb-2">
        {movie
          .genres!.slice(0, 3)
          .map((genre: { id: number; name: string }) => (
            <span
              className="translate-y-10 transform animate-fade-in-up rounded-full bg-secondary-color px-[6px] py-[2px] text-xs opacity-0 delay-300 md:px-[12px] md:py-[4px] md:text-sm"
              key={genre.id}
            >
              {genre.name}
            </span>
          ))}
      </div>

      <p
        key={movie.overview}
        className="mb-0 hidden translate-y-10 transform animate-fade-in-up text-xs opacity-0 delay-200 md:mb-4 md:block md:text-sm lg:text-base"
      >
        {movie.overview}
      </p>
    </>
  );
}
