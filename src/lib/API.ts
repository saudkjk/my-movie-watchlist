'use server';
import { redirect } from "next/navigation";
import genres from "@/lib/genres.json";
import { updateWithDbStatus } from "./database";
const API_KEY = process.env.API_KEY;

export async function fetchMoviesByQuery(query: string, page: number) {

  // get movies
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=${page}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();

  // get runtime
  const results = await Promise.all(
    data.results.map(async (movie: any) => {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
      );
      const movieData = await movieRes.json();
      return {
        ...movie,
        runtime: movieData.runtime,
      };
    })
  );

  return results;
}

export async function fetchMoviesByQueryWithDbStatus(query: string, page: number, currentUserId: string) {

  const results = await fetchMoviesByQuery(query, page);

  const updatedRes = currentUserId
    ? await updateWithDbStatus(String(currentUserId), results)
    : results;
  return updatedRes;
}

export async function fetchMoviesTopOrTrending(genre: string, page: number) {

  // get movies
  const res = await fetch(
    `https://api.themoviedb.org/3${genre === "toprated" ? "/movie/top_rated" : "/trending/movie/week"}?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  // get runtime
  const results = await Promise.all(
    data.results.map(async (movie: any) => {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
      );
      const movieData = await movieRes.json();
      return {
        ...movie,
        runtime: movieData.runtime,
      };
    })
  );

  return results;
}

export async function fetchMoviesTopOrTrendingWithDbStatus(genre: string, page: number, currentUserId: string) {

  const results = await fetchMoviesTopOrTrending(genre, page);

  const updatedRes = currentUserId
    ? await updateWithDbStatus(String(currentUserId), results)
    : results;
  return updatedRes;
}

export async function fetchMoviesByGenre(genreId: number, page: number) {
  // get movies by genre
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreId}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  // get runtime
  const results = await Promise.all(
    data.results.map(async (movie: any) => {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
      );
      const movieData = await movieRes.json();
      return {
        ...movie,
        runtime: movieData.runtime,
      };
    })
  );

  return results;
}

export async function fetchMoviesByGenreWithDbStatus(genreId: string, page: number, currentUserId: string) {

  const results = await fetchMoviesByGenre(Number(genreId), page);

  const updatedRes = currentUserId
    ? await updateWithDbStatus(String(currentUserId), results)
    : results;
  return updatedRes;
}

export async function fetchMoviesByIds(movies: any[]) {

  const results = await Promise.all(
    movies.map(async (movie) => {
      try {
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=${API_KEY}&language=en-US`
        );

        if (!movieRes.ok) {
          throw new Error(`Failed to fetch movie with ID ${movie.movieId}`);
        }

        const movieData = await movieRes.json();
        return movieData;
      } catch (error) {
        console.error(`Error fetching movie ID ${movie.movieId}:`, error);
        return null;
      }
    })
  );

  return results.filter(result => result !== null);
}

export async function fetchMoviesAndPageInfo(genre: string, currentUserId: string) {
  let genreMovies, title, param, fetchMoviesWithDbStatus;

  if (genre === "toprated" || genre === "trending") {
    genreMovies = await fetchMoviesTopOrTrendingWithDbStatus(
      genre,
      1,
      currentUserId
    );
    title = genre === "toprated" ? "Top Rated" : "Trending";
    param = genre;
    fetchMoviesWithDbStatus = fetchMoviesTopOrTrendingWithDbStatus;
  }
  else {
    // Find the genre ID from the genre name
    const genreId = genres.find((g) => g.name.toLowerCase() === genre.toLowerCase())?.id;
    if (!genreId) redirect("/");

    genreMovies = await fetchMoviesByGenreWithDbStatus(String(genreId), 1, currentUserId);
    fetchMoviesWithDbStatus = fetchMoviesByGenreWithDbStatus;
    param = String(genreId);
    title = genre.charAt(0).toUpperCase() + genre.slice(1);
  }

  return { genreMovies, title, param, fetchMoviesWithDbStatus };
}
