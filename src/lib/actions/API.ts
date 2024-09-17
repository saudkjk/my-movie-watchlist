"use server";
import axios from "axios";
import {
  getCompletedListMovies,
  updateWithDbStatus,
} from "@/lib/actions/database";
const TMDB_API_KEY = process.env.API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
import OpenAI from "openai";
import { Movie } from "../types/types";
import { revalidatePath } from "next/cache";
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function fetchMoviesByQuery(query: string, page: number) {
  // get movies
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&page=${page}&query=${encodeURIComponent(query)}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  // get runtime
  const results = await Promise.all(
    data.results.map(async (movie: Movie) => {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}`,
      );
      const movieData = await movieRes.json();
      return {
        ...movie,
        runtime: movieData.runtime,
      };
    }),
  );

  return results;
}

export async function fetchMoviesByQueryWithDbStatus(
  query: string,
  userId: string,
  sortBy: string = "popularity.desc",
  page: number = 1,
) {
  const results = await fetchMoviesByQuery(query, page);

  const updatedRes = userId
    ? await updateWithDbStatus(userId, results)
    : results;
  return updatedRes;
}

export async function fetchBestOfYear(
  bestOfYear: number,
  userId: string,
  page: Number = 1,
) {
  let endpoint = `/discover/movie?primary_release_year=${bestOfYear}&sort_by=vote_average.desc&vote_count.gte=500&`;

  const res = await fetch(
    `https://api.themoviedb.org/3${endpoint}api_key=${TMDB_API_KEY}&with_original_language=en&language=en-US&page=${page}&with_runtime.gte=60&without_genres=99`,
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const updatedRes = userId
    ? await updateWithDbStatus(String(userId), data.results)
    : data.results;
  revalidatePath(`/`);
  return updatedRes;
}

export async function fetchMovies(
  category: string,
  userId: string,
  sortBy: string = "popularity.desc",
  page: Number = 1,
) {
  let endpoint = "/trending/movie/week?";
  if (category === "toprated") endpoint = "/movie/top_rated?";
  else if (category === "popular") endpoint = "/movie/popular?";
  else if (category === "nowplaying") endpoint = "/movie/now_playing?";
  else if (category === "upcoming") {
    const today = new Date().toISOString().split("T")[0];
    endpoint = `/discover/movie?primary_release_date.gte=${today}&`;
  } else if (category === "today") {
    endpoint = `/trending/movie/day?`;
  }

  // Get movies
  const res = await fetch(
    `https://api.themoviedb.org/3${endpoint}api_key=${TMDB_API_KEY}&with_original_language=en&language=en-US&page=${page}`,
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const updatedRes = userId
    ? await updateWithDbStatus(String(userId), data.results)
    : data.results;
  return updatedRes;
}

export async function fetchSimilarMovies(
  movieId: string,
  userId: string,
  page: Number = 1,
) {
  const endpoint = `/movie/${movieId}/recommendations?`;

  const res = await fetch(
    `https://api.themoviedb.org/3${endpoint}api_key=${TMDB_API_KEY}&with_original_language=en&language=en-US&page=${page}`,
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch similar movies");
  }

  const results = await Promise.all(
    data.results.map(async (movie: Movie) => {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}`,
      );
      const movieData = await movieRes.json();
      return {
        ...movie,
        runtime: movieData.runtime,
      };
    }),
  );

  const updatedRes = userId
    ? await updateWithDbStatus(String(userId), results)
    : results;

  return updatedRes;
}

// export async function fetchMovies(category: string, userId: string, sortBy: string = "popularity.desc", page: Number = 1) {

//   let endpoint = "/trending/movie/week?";

//   if (category === "toprated")
//     endpoint = "/movie/top_rated?";
//   else if (category === "popular")
//     endpoint = "/movie/popular?";
//   else if (category === "nowplaying")
//     endpoint = "/movie/now_playing?";
//   else if (category === "upcoming") {
//     const today = new Date().toISOString().split('T')[0];
//     endpoint = `/discover/movie?primary_release_date.gte=${today}&`;
//   } else if (category === "bestofyear") {
//     const currentYear = new Date().getFullYear();
//     endpoint = `/discover/movie?primary_release_year=${currentYear}&sort_by=vote_average.desc&vote_count.gte=300&`;
//   }

//   // Get movies
//   const res = await fetch(
//     `https://api.themoviedb.org/3${endpoint}api_key=${TMDB_API_KEY}&with_original_language=en&language=en-US&page=${page}`
//   );

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   // Get runtime
//   let results = await Promise.all(
//     data.results.map(async (movie: Movie) => {
//       const movieRes = await fetch(
//         `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}`
//       );
//       const movieData = await movieRes.json();

//       const imagesRes = await fetch(
//         `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${TMDB_API_KEY}`
//       );

//       const imagesData = await imagesRes.json();

//       const englishBackdrop = imagesData.backdrops.find(
//         (backdrop: { iso_639_1: string; }) => backdrop.iso_639_1 === 'en'
//       );

//       console.log("englishBackdrop: ", englishBackdrop)
//       const backdropUrl = englishBackdrop
//         ? englishBackdrop.file_path
//         : imagesData.backdrops.length > 0
//           ? imagesData.backdrops[0].file_path
//           : null;

//       console.log(" backdrop url: ", backdropUrl)
//       return {
//         ...movie,
//         runtime: movieData.runtime,
//         backdrop: backdropUrl,
//       };
//     })
//   );

//   // // Get images
//   // results = await Promise.all(
//   //   data.results.map(async (movie: Movie) => {
//   //     const movieRes = await fetch(
//   //       `https://api.themoviedb.org/3/movie/${movie.id}/images??api_key=${TMDB_API_KEY}&include_image_language=en`
//   //     );
//   //     const movieData = await movieRes.json();
//   //     return {
//   //       ...movie,
//   //       englishBackdropPath: ,
//   //     };
//   //   })
//   // );

//   // Get images
//   // results = await Promise.all(
//   //   data.results.map(async (movie: Movie) => {
//   //     const movieRes = await fetch(
//   //       `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${TMDB_API_KEY}&include_image_language=en`
//   //     );
//   //     const movieData = await movieRes.json();

//   //     (backdrop: any) => backdrop.iso_639_1 === 'en'

//   //     return {
//   //       ...movie,
//   //       englishBackdropPath: englishBackdrop
//   //         ? englishBackdrop.file_path
//   //         : movieData.backdrops[0]?.file_path,
//   //     };
//   //   })
//   // );

//   const updatedRes = userId
//     ? await updateWithDbStatus(String(userId), results)
//     : results;
//   return updatedRes;
// }

// export async function fetchSimilarMovies(movieId: string, userId: string, page: Number = 1) {

//   const endpoint = `/movie/${movieId}/recommendations?`;

//   const res = await fetch(
//     `https://api.themoviedb.org/3${endpoint}api_key=${TMDB_API_KEY}&with_original_language=en&language=en-US&page=${page}`
//   );

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error('Failed to fetch similar movies');
//   }

//   const results = await Promise.all(
//     data.results.map(async (movie: Movie) => {
//       const movieRes = await fetch(
//         `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}`
//       );
//       const movieData = await movieRes.json();
//       return {
//         ...movie,
//         runtime: movieData.runtime,
//       };
//     })
//   );

//   // Optionally update results with user's database status if userId is provided
//   const updatedRes = userId
//     ? await updateWithDbStatus(String(userId), results)
//     : results;

//   return updatedRes;
// }

// export async function fetchMovies(category: string, userId: string, sortBy: string = "popularity.desc", page: Number = 1) {

//   let endpoint = "/trending/movie/week?";
//   if (category === "toprated")
//     endpoint = "/movie/top_rated?";
//   else if (category === "popular")
//     endpoint = "/movie/popular?";
//   else if (category === "nowplaying")
//     endpoint = "/movie/now_playing?";
//   else if (category === "upcoming") {
//     const today = new Date().toISOString().split('T')[0];
//     endpoint = `/discover/movie?primary_release_date.gte=${today}&`;
//   }

//   // Get movies
//   const res = await fetch(
//     `https://api.themoviedb.org/3${endpoint}api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
//   );

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   // Get runtime
//   const results = await Promise.all(
//     data.results.map(async (movie: Movie) => {
//       const movieRes = await fetch(
//         `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=en-US`
//       );
//       const movieData = await movieRes.json();
//       return {
//         ...movie,
//         runtime: movieData.runtime,
//       };
//     })
//   );

//   const updatedRes = userId
//     ? await updateWithDbStatus(String(userId), results)
//     : results;
//   return updatedRes;
// }

// export async function fetchMovies(genre: string, page: Number) {
//   // get movies
//   const res = await fetch(
//     `https://api.themoviedb.org/3${genre === "toprated" ? "/movie/top_rated" : "/trending/movie/week"}?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
//   );
//   const data = await res.json();
//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   // get runtime
//   const results = await Promise.all(
//     data.results.map(async (movie: any) => {
//       const movieRes = await fetch(
//         `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=en-US`
//       );
//       const movieData = await movieRes.json();
//       return {
//         ...movie,
//         runtime: movieData.runtime,
//       };
//     })
//   );

//   return results;
// }

// export async function fetchMovies(genre: string, page: Number, userId: string, sortBy: string) {

//   let endpoint = "/trending/movie/week";
//   if (genre === "toprated")
//     endpoint = "/movie/top_rated";
//   else if (genre === "popular")
//     endpoint = "/movie/popular";

//   // get movies
//   const res = await fetch(
//     `https://api.themoviedb.org/3${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
//   );

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   // get runtime
//   const results = await Promise.all(
//     data.results.map(async (movie: any) => {
//       const movieRes = await fetch(
//         `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=en-US`
//       );
//       const movieData = await movieRes.json();
//       return {
//         ...movie,
//         runtime: movieData.runtime,
//       };
//     })
//   );

//   const updatedRes = userId
//     ? await updateWithDbStatus(String(userId), results)
//     : results;
//   return updatedRes;
// }

// export async function fetchMovies(genre: string, page: number, userId: string, sortBy: string) {

//   const results = await fetchMoviesTopOrTrending(genre, page);

//   const updatedRes = userId
//     ? await updateWithDbStatus(String(userId), results)
//     : results;
//   return updatedRes;
// }

export async function fetchMoviesByGenre(
  genreIds: string,
  page: number,
  sortBy: string,
) {
  // get movies by genre
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=en&page=${page}&with_genres=${genreIds}&sort_by=${sortBy}&vote_count.gte=100}`,
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // get runtime
  const results = await Promise.all(
    data.results.map(async (movie: Movie) => {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&with_original_language=en`,
      );
      const movieData = await movieRes.json();
      return {
        ...movie,
        runtime: movieData.runtime,
      };
    }),
  );

  return results;
}

export async function fetchMoviesByGenreWithDbStatus(
  genreIds: string,
  userId: string,
  sortBy: string = "popularity.desc",
  page: number = 1,
) {
  const results = await fetchMoviesByGenre(genreIds, page, sortBy);

  const updatedRes = userId
    ? await updateWithDbStatus(String(userId), results)
    : results;
  return updatedRes;
}

export async function fetchMoviesGeneral(page: number, sortBy: string) {
  // get movies by genre
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=en&page=${page}&sort_by=${sortBy}&vote_count.gte=100}`,
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // get runtime
  const results = await Promise.all(
    data.results.map(async (movie: Movie) => {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&with_original_language=en`,
      );
      const movieData = await movieRes.json();
      return {
        ...movie,
        runtime: movieData.runtime,
      };
    }),
  );

  return results;
}

export async function fetchMoviesGeneralWithDbStatus(
  genreIds: string,
  userId: string,
  sortBy: string = "popularity.desc",
  page: number = 1,
) {
  const results = await fetchMoviesGeneral(page, sortBy);

  const updatedRes = userId
    ? await updateWithDbStatus(String(userId), results)
    : results;
  return updatedRes;
}

export async function fetchMoviesByIds(moviesIds: string[]) {
  const results = await Promise.all(
    moviesIds.map(async (movieId) => {
      try {
        const movieRes = await fetch(
          // `https://api.themoviedb.org/3/movie/${moviesId}?api_key=${TMDB_API_KEY}`
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&append_to_response=videos,credits,images,external_ids,release_dates&include_image_language=null`,
        );

        if (!movieRes.ok) {
          throw new Error(`Failed to fetch movie with ID ${movieId}`);
        }

        const movieData = await movieRes.json();
        return movieData;
      } catch (error) {
        console.error(`Error fetching movie ID ${movieId}:`, error);
        return null;
      }
    }),
  );

  return results.filter((result) => result !== null);
}

export async function fetchMoviesByIdsWithDbStatus(
  moviesIds: string[],
  userId: string,
) {
  const results = await fetchMoviesByIds(moviesIds);
  const updatedRes = userId
    ? await updateWithDbStatus(String(userId), results)
    : results;
  return updatedRes;
}

export async function fetchMovieCredits(movieId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch movie with ID ${movieId}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching movie ID ${movieId}:`, error);
    throw error;
  }
}

export async function fetchMovieById(movieId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&append_to_response=videos,credits,images,external_ids,release_dates&include_image_language=en`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie with ID ${movieId}`);
    }

    const movieData = await response.json();
    // console.log(movieData.images.backdrops[0].file_path);
    return movieData;
  } catch (error) {
    console.error(`Error fetching movie ID ${movieId}:`, error);
    throw error;
  }
}

export async function getMovieByIdWithDbStatus(
  movieId: string,
  userId: string,
) {
  try {
    const movieData = await fetchMovieById(movieId);

    const resultWithDbStatus = userId
      ? await updateWithDbStatus(String(userId), [movieData])
      : [movieData];

    return resultWithDbStatus[0];
  } catch (error) {
    console.error(
      `Error in getMovieByIdWithDbStatus for ID ${movieId}:`,
      error,
    );
    return null;
  }
}

export const getMovieRecommendations = async (movies: Movie[]) => {
  const prompt = `${movies.map((movie) => movie.title).join(", ")}`;
  // console.log(prompt)
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 150,
    messages: [
      {
        role: "system",
        content:
          "You provide ten movie recommendations with their realise year after them like this 'inception y:2010' separated with a comma based on the given movie list and nothing more and do not recommend movies I gave you already, if no movies are given just recommend ten movies that are popular/trending",
      },
      { role: "user", content: prompt },
    ],
  });

  const responseMessage = res.choices[0].message.content;

  if (responseMessage) {
    return responseMessage.split(",");
  } else {
    return [];
  }
};

// export const getMovieDetails = async (movieTitle: string) => {
//   // movie title example 'A Quiet Place: Day One y:2023'
//   const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieTitle)}`);
//   return response.data.results[0];
// };
// export const getMovieDetails = async (movieTitle: string) => {
//   // Remove the year part if it exists (e.g., " y:2023")
//   const titleMatch = movieTitle.match(/(.+?)\s*y:/);
//   const yearMatch = movieTitle.match(/y:(\d{4})/);
//   console.log(titleMatch, yearMatch)
//   const title = titleMatch ? titleMatch[1].trim() : null;
//   const year = yearMatch ? yearMatch[1] : null;
//   const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title!)}`);
//   return response.data.results[0];
// };

export const getMovieDetails = async (movieTitle: string) => {
  const yearMatch = movieTitle.match(/ y:(\d{4})$/);
  const year = yearMatch ? yearMatch[1] : null;
  const cleanTitle = movieTitle.replace(/ y:\d{4}$/, "").trim();
  // console.log(cleanTitle, year)
  let query = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(cleanTitle)}`;
  if (year) {
    query += `&year=${year}`;
  }
  const response = await axios.get(query);
  return response.data.results[0];
};

export async function fetchRecommendedMovies(userId: string) {
  if (userId) {
    // const completedMoviesIds = await getCompletedMoviesIds(userId);
    const completedMoviesIds = await getCompletedListMovies(userId);
    const movieIdsArray = completedMoviesIds.movieIds;
    const completedMovies = await fetchMoviesByIds(movieIdsArray);
    const completedMoviesWithDbStatus = await updateWithDbStatus(
      userId,
      completedMovies,
    );
    const likedMovies = completedMoviesWithDbStatus.reduce(
      (acc: Movie[], movie: Movie) => {
        if (movie.isLiked) {
          acc.push(movie);
        }
        return acc;
      },
      [],
    );

    const movieRecommendations = await getMovieRecommendations(likedMovies);
    // console.log(movieRecommendations)
    const movieRecommendationsDetailsPromises = movieRecommendations.map(
      (title: string) => getMovieDetails(title),
    );
    const movieRecommendationsDetails = await Promise.all(
      movieRecommendationsDetailsPromises,
    );
    const movieRecommendationsWithDbStatus = await updateWithDbStatus(
      userId,
      movieRecommendationsDetails,
    );
    return movieRecommendationsWithDbStatus;
  } else {
    return [];
  }
}

export async function getTrailerUrl(movieId: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`,
  );
  const data = await response.json();

  const trailer = data.results.find(
    (video: any) => video.site === "YouTube" && video.type === "Trailer",
  );

  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}
