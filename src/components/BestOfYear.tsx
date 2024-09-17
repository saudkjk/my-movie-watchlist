// "use client";
// import { fetchBestOfYear } from "@/lib/actions/API";
// import { Movie } from "@/lib/types/types";
// import React, { useState, ChangeEvent, useEffect } from "react";
// import MovieCardSwiper from "./MovieCardSwiper";

// function BestOfYear({
//   initialBestOfYearMovies,
//   userId,
// }: {
//   initialBestOfYearMovies: Movie[];
//   userId: string;
// }) {
//   const currentYear: number = new Date().getFullYear();
//   const [pickedYear, setPickedYear] = useState(currentYear.toString());
//   const [bestOfYearMovies, setBestOfYearMovies] = useState<Movie[]>(
//     initialBestOfYearMovies,
//   );

//   useEffect(() => {
//     async function fetchBestOfYearMovies() {
//       try {
//         const fetchedMovies = await fetchBestOfYear(Number(pickedYear), userId);
//         setBestOfYearMovies(fetchedMovies);
//       } catch (error) {
//         console.error("Failed to fetch movies", error);
//       }
//     }

//     fetchBestOfYearMovies();
//   }, [pickedYear, userId]);

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setPickedYear(value === "" ? "" : value);
//   };

//   return (
//     <div className="mb-8 sm:mb-16">
//       <div className="mb-4 ml-2 flex items-center gap-1 sm:mb-5">
//         <div className="flex items-center text-xl font-bold">
//           <span>TOP OF</span>
//           <input
//             type="number"
//             value={pickedYear}
//             onChange={handleChange}
//             min="1900"
//             max={currentYear}
//             className="-ml-3 bg-transparent p-0 text-center text-xl font-bold focus:outline-none"
//           />
//         </div>
//       </div>

//       {Number(pickedYear) >= 1900 && Number(pickedYear) <= currentYear ? (
//         <MovieCardSwiper movies={bestOfYearMovies} userId={userId} />
//       ) : (
//         <div className="mb-4 ml-2 text-sm text-red-400">
//           Please pick a year between 1900 and {currentYear}.
//         </div>
//       )}
//     </div>
//   );
// }

// export default BestOfYear;
