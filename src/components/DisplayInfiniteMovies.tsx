// "use client";
// import { fetchMovies, fetchMoviesTopTrending } from "@/lib/API";
// import React, { useEffect, useState } from "react";
// import { useInView } from "react-intersection-observer";
// import { useUser } from "@clerk/nextjs";
// import MovieCard from "./MovieCard";
// import Image from "next/image";
// import { updateWithDatabaseStatus } from "@/lib/database";
// import DisplayMovies from "./DisplayMovies";
// let page = 2;

// export default function DisplayInfiniteMovies({ movies }: { movies: any[] }) {
//   const { ref, inView } = useInView();
//   const [data, setData] = useState<any[]>(movies);
//   const [isLoading, setIsLoading] = useState(true);
//   const currentUserId = useUser().user?.id;

//   useEffect(() => {
//     if (inView) {
//       setIsLoading(true);
//       const delay = 300;

//       const timeoutId = setTimeout(() => {
//         fetchMoviesTopTrending("toprated", page).then(async (res) => {
//           // const updatedRes = currentUserId
//           //   ? await updateWithDatabaseStatus(String(currentUserId), res)
//           //   : res;
//           // setData((prevData) => [...prevData, ...res]);
//           setData([...data, ...res]);
//           page += 1;
//         });
//         setIsLoading(false);
//       }, delay);
//       return () => clearTimeout(timeoutId);
//     }
//   }, [inView, isLoading]);

//   return (
//     <div>
//       <DisplayMovies movies={data} currentUserId={currentUserId!} />
//       {/* <div className="flex flex-wrap justify-center">
//         {data.map((movie, index) => (
//           <div key={movie.id}>
//             <MovieCard
//               movie={movie}
//               currentUserId={currentUserId!}
//               isLCP={index === 0}
//             />
//           </div>
//         ))}
//       </div> */}

//       <section className="flex w-full items-center justify-center">
//         <div ref={ref}>
//           {inView && isLoading && (
//             <Image
//               src="/spinner.svg"
//               alt="spinner"
//               width={56}
//               height={56}
//               className="mb-10 mt-5 object-contain"
//             />
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";
import {
  fetchMovies,
  fetchMoviesTopTrending,
  fetchMoviesTopTrendingUpdatedStatus,
} from "@/lib/API";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useUser } from "@clerk/nextjs";
import MovieCard from "./MovieCard";
import Image from "next/image";
import { updateWithDatabaseStatus } from "@/lib/database";
import DisplayMovies from "./DisplayMovies";
let page = 2;

export default function DisplayInfiniteMovies({ movies }: { movies: any[] }) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<any[]>(movies);
  const [isLoading, setIsLoading] = useState(true);
  const currentUserId = useUser().user?.id;

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      const delay = 300;
      console.log("inview");

      const timeoutId = setTimeout(() => {
        fetchMoviesTopTrendingUpdatedStatus(
          "toprated",
          page,
          currentUserId!,
        ).then((res) => {
          // const updatedRes = currentUserId
          //   ? await updateWithDatabaseStatus(String(currentUserId), res)
          //   : res;
          // setData((prevData) => [...prevData, ...res]);
          setData([...data, ...res]);
          page += 1;
        });
        setIsLoading(false);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [inView, isLoading]);

  return (
    <div>
      {/* <DisplayMovies movies={data} currentUserId={currentUserId!} /> */}

      <div className="flex flex-wrap justify-center">
        {data.map((movie, index) => (
          <div key={movie.id}>
            <MovieCard
              movie={movie}
              currentUserId={currentUserId!}
              isLCP={index === 0}
            />
          </div>
        ))}
      </div>

      <section className="flex w-full items-center justify-center">
        <div ref={ref}>
          {inView && isLoading && (
            <Image
              src="/spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="mb-10 mt-5 object-contain"
            />
          )}
        </div>
      </section>
    </div>
  );
}
