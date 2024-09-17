// "use server";
// import React from "react";
// import { fetchRecommendedMovies } from "@/lib/actions/API";
// import "swiper/css";
// import MovieCardSwiper from "./MovieCardSwiper";
// import PageTitle from "./PageTitle";
// import { IoMdRefresh } from "react-icons/io";
// import RefreshButton from "./RefreshButton";
// export default async function MovieRecommendations({
//   userId,
// }: {
//   userId: string;
// }) {
//   const recommendedMovies = await fetchRecommendedMovies(userId);
//   return (
//     <>
//       <div className="mb-4 ml-2 flex items-center justify-between sm:mb-5">
//         <RefreshButton>
//           <PageTitle title="YOUR RECOMMENDED MOVIES" />
//           <IoMdRefresh className="text-lg md:text-xl xl:text-2xl" />
//         </RefreshButton>
//       </div>
//       <MovieCardSwiper movies={recommendedMovies} userId={userId} />
//     </>
//   );
// }
