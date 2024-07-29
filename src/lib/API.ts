import 'server-only';
const API_KEY = process.env.API_KEY;

export async function fetchMoviesQueries(query: string, page: number) {

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

export async function fetchMoviesTopTrending(genre: string, page: number) {

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

export async function fetchMovieById(watchlist: any[]) {

  const results = await Promise.all(
    watchlist.map(async (item) => {
      try {
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${item.movieId}?api_key=${API_KEY}&language=en-US`
        );

        if (!movieRes.ok) {
          throw new Error(`Failed to fetch movie with ID ${item.movieId}`);
        }

        const movieData = await movieRes.json();
        return movieData;
      } catch (error) {
        console.error(`Error fetching movie ID ${item.movieId}:`, error);
        return null; // Return null or some error indicator
      }
    })
  );

  return results.filter(result => result !== null);
}
