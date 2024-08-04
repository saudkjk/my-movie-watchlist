'use server';
import axios from 'axios';
import { getCompletedMoviesIds, updateWithDbStatus } from "@/lib/actions/database";
const TMDB_API_KEY = process.env.API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function fetchMoviesByQuery(query: string, page: number) {
  // get movies
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&page=${page}&query=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();

  // get runtime
  const results = await Promise.all(
    data.results.map(async (movie: any) => {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=en-US`
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

export async function fetchMoviesTopOrTrending(genre: string, page: Number) {
  // get movies
  const res = await fetch(
    `https://api.themoviedb.org/3${genre === "toprated" ? "/movie/top_rated" : "/trending/movie/week"}?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  // get runtime
  const results = await Promise.all(
    data.results.map(async (movie: any) => {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=en-US`
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

export async function fetchMoviesTopOrTrendingWithDbStatus(genre: string, page: number, currentUserId: string, sortBy: string) {

  const results = await fetchMoviesTopOrTrending(genre, page);

  const updatedRes = currentUserId
    ? await updateWithDbStatus(String(currentUserId), results)
    : results;
  return updatedRes;
}

export async function fetchMoviesByGenre(genreIds: string, page: number, sortBy: string) {
  // get movies by genre
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&page=${page}&with_genres=${genreIds}&sort_by=${sortBy}&vote_count.gte=50}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  // get runtime
  const results = await Promise.all(
    data.results.map(async (movie: any) => {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=en-US`
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

export async function fetchMoviesByGenreWithDbStatus(genreIds: string, page: number, currentUserId: string, sortBy: string) {

  const results = await fetchMoviesByGenre(genreIds, page, sortBy);

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
          `https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=${TMDB_API_KEY}&language=en-US`
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

export const getMovieRecommendations = async (movies: any[]) => {
  const prompt = `${movies.map(movie => movie.title).join(', ')}`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 150,
    messages:
      [{ "role": "system", "content": "You provide six movie recommendations separated with a comma based on the given movie list and nothing more" },
      { "role": "user", "content": prompt }]
    // [{ role: "user", content: prompt }],
  })

  const responseMessage = res.choices[0].message.content;

  if (responseMessage) {
    return responseMessage.split(',');
  } else {
    return [];
  }

};

export const getMovieDetails = async (movieTitle: string) => {
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieTitle)}`);
  return response.data.results[0]; // Assuming the first result is the most relevant
};


export async function fetchRecommendedMovies(currentUserId: string) {

  if (currentUserId) {
    const completedMoviesIds = await getCompletedMoviesIds(currentUserId);
    const completedMovies = await fetchMoviesByIds(completedMoviesIds);
    const completedMoviesWithDbStatus = await updateWithDbStatus(
      currentUserId,
      completedMovies,
    );
    const likedMovies = completedMoviesWithDbStatus.reduce((acc, movie) => {
      if (movie.isLiked) {
        acc.push(movie);
      }
      return acc;
    }, []);

    const movieRecommendations = await getMovieRecommendations(likedMovies);
    console.log(movieRecommendations);
    const movieRecommendationsDetailsPromises = movieRecommendations.map((title: string) => getMovieDetails(title));
    const movieRecommendationsDetails = await Promise.all(movieRecommendationsDetailsPromises);
    const movieRecommendationsWithDbStatus = await updateWithDbStatus(
      currentUserId,
      movieRecommendationsDetails,
    )
    return movieRecommendationsWithDbStatus;

  } else {
    return [];
  }
}