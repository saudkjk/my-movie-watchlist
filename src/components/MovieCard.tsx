// "use client";
// import React, { memo, useEffect, useState } from "react";
// import { DirectionAwareHover } from "./ui/direction-aware-hover";
// import { BsPlusCircle, BsCheckCircle, BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from 'next/navigation'
// import { addToCompleted, removeFromCompleted, addToWatchlist, removeFromWatchlist, updateWithDatabaseStatus1 } from "@/lib/database";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// interface MovieCardProps {
//     userId: string;
//     movie:
//     {
//         id: string;
//         title: string;
//         runtime?: number;
//         vote_average: number;
//         poster_path?: string;
//         isLiked: boolean | null;
//         inWatchlist: boolean | null;
//         inCompleted: boolean | null;
//     };
// }
// export const MovieCard = memo(function MovieCard({ movie, userId }: MovieCardProps) {

//     const [inWatchlist, setInWatchlist] = useState(false);
//     const [inCompleted, setInCompleted] = useState(false);
//     const [isLiked, setIsLiked] = useState(false);

//     console.log("MovieCard rendered")
//     let imageURL = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
//     if (imageURL.endsWith('null')) {
//         imageURL = '/posterPlaceHolder.jpg';
//     }
//     const { isSignedIn } = useUser();
//     const router = useRouter();

//     const handleAddToWatchlist = async (userId: string, movieId: string) => {
//         if (!isSignedIn) {
//             router.push('/sign-in');
//         } else {
//             await addToWatchlist(userId, movieId);
//         }
//     }

//     const handleRemoveFromWatchlist = async (userId: string, movieId: string) => {
//         await removeFromWatchlist(userId, movieId);
//     }

//     const handleAddToCompleted = async (userId: string, movieId: string, rating: string) => {
//         if (!isSignedIn) {
//             router.push('/sign-in');
//         } else {
//             await addToCompleted(userId, movieId, rating);
//         }
//     }

//     const handleRemoveFromCompleted = async (userId: string, movieId: string) => {
//         if (!isSignedIn) {
//             router.push('/sign-in');
//         } else {
//             await removeFromCompleted(userId, movieId);
//         }
//     }

//     // const handleDatabaseRequest = async (action: Function) => {
//     //     if (!isSignedIn) {
//     //         router.push('/sign-in');
//     //     } else {
//     //         await action();
//     //     }
//     // };

//     // useEffect(() => {
//     //     async function fetchMovieStatus() {
//     //         const updatedMovieStatus = await updateWithDatabaseStatus1(userId, Number(movie.id));
//     //         setInWatchlist(updatedMovieStatus.inWatchlist);
//     //         setInCompleted(updatedMovieStatus.inCompleted);
//     //         setIsLiked(updatedMovieStatus.isLiked);
//     //     }
//     //     fetchMovieStatus();
//     //     // }, [userId, movie.id]);
//     // }, []);

//     return (
//         <div className="h-80 w-full flex items-center justify-center p-3 m-3">
//             <DirectionAwareHover imageUrl={imageURL}>
//                 <p className="font-bold text-xl">{movie.title}</p>
//                 <p className="font-normal text-sm">
//                     Duration: {movie.runtime ? `${movie.runtime} minutes` : "N/A"}
//                     <br />
//                     {/* Rating: {movie.rating.toFixed(1)} */}
//                     Rating: {movie.vote_average.toFixed(1)}
//                 </p>
//                 <TooltipProvider>
//                     <div className="flex mb-1 mt-1 ">
//                         {!inWatchlist ?
//                             <div onClick={() => handleAddToWatchlist(userId, movie.id)} className="cursor-pointer mr-1">
//                                 <Tooltip>
//                                     <TooltipTrigger asChild>
//                                         <div className="inline-block">
//                                             <BsPlusCircle className="text-white text-3xl" />
//                                         </div>
//                                     </TooltipTrigger>
//                                     <TooltipContent className="transform translate-x-11">
//                                         <p>Add to watchlist</p>
//                                     </TooltipContent>
//                                 </Tooltip>
//                             </div>
//                             :
//                             <div onClick={() => handleRemoveFromWatchlist(userId, movie.id)} className="cursor-pointer mr-1">
//                                 <Tooltip>
//                                     <TooltipTrigger asChild>
//                                         <div className="inline-block">
//                                             <BsCheckCircle className="text-green-500 text-3xl" />
//                                         </div>
//                                     </TooltipTrigger>
//                                     <TooltipContent className="transform translate-x-16">
//                                         <p> Remove from watchlist</p>
//                                     </TooltipContent>
//                                 </Tooltip>
//                             </div>
//                         }

//                         {/* <Tooltip>
//                             <TooltipTrigger asChild>
//                                 <div onClick={() => handleDatabaseRequest(() => inWatchlist ? removeFromWatchlist(userId, movie.movieId) : addToWatchlist(userId, movie.movieId))} className="cursor-pointer mr-1">
//                                     {inWatchlist ? <BsCheckCircle className="text-green-500 text-3xl" /> : <BsPlusCircle className="text-white text-3xl" />}
//                                 </div>
//                             </TooltipTrigger>
//                             <TooltipContent className={`transform translate-x-${inWatchlist ? '16' : '11'}`}>
//                                 <p>{inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}</p>
//                             </TooltipContent>
//                         </Tooltip> */}

//                         {!inCompleted ?
//                             <Tooltip delayDuration={0}>
//                                 <TooltipTrigger asChild>
//                                     <div className="inline-block">
//                                         <BsHandThumbsUp className="text-white text-3xl" />
//                                     </div>
//                                 </TooltipTrigger>
//                                 <TooltipContent >
//                                     <div className="flex">
//                                         <div onClick={() => handleAddToCompleted(userId, movie.id, "liked")} className="cursor-pointer">
//                                             <div className="inline-block">
//                                                 <BsHandThumbsUp className="text-black dark:text-white text-3xl" />
//                                             </div>
//                                         </div>
//                                         <div onClick={() => handleAddToCompleted(userId, movie.id, "disliked")} className="cursor-pointer">
//                                             <div className="inline-block">
//                                                 <BsHandThumbsDown className="text-black dark:text-white text-3xl" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </TooltipContent>
//                             </Tooltip>
//                             :
//                             <div onClick={() => handleRemoveFromCompleted(userId, movie.id)} className="cursor-pointer">
//                                 <Tooltip>
//                                     <TooltipTrigger asChild>
//                                         <div className="inline-block">
//                                             {isLiked ?
//                                                 <BsHandThumbsUp className="text-green-500 text-3xl" />
//                                                 :
//                                                 <BsHandThumbsDown className="text-red-500 text-3xl" />
//                                             }
//                                         </div>
//                                     </TooltipTrigger>
//                                     <TooltipContent className="transform translate-x-9">
//                                         <p> Remove from completed</p>
//                                     </TooltipContent>
//                                 </Tooltip>
//                             </div>
//                         }
//                     </div>
//                 </TooltipProvider>
//             </DirectionAwareHover>
//         </div>
//     );
// });

// "use client";
// import React, { useState } from "react";
// import { DirectionAwareHover } from "./ui/direction-aware-hover";
// import { BsPlusCircle, BsCheckCircle, BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from 'next/navigation'
// import { addToCompleted, removeFromCompleted, addToWatchlist, removeFromWatchlist } from "@/lib/database";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// interface MovieCardProps {
//     userId: string;
//     movie: any;
// }
// export const MovieCard = function MovieCard({ movie, userId }: MovieCardProps) {
//     // load initial states from database
//     const [inWatchlist, setInWatchlist] = useState(movie.inWatchlist);
//     const [inCompleted, setInCompleted] = useState(movie.inCompleted);
//     const [isLiked, setIsLiked] = useState(movie.isLiked);

//     let imageURL = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
//     if (imageURL.endsWith('null')) imageURL = '/posterPlaceHolder.jpg';

//     const { isSignedIn } = useUser();
//     const router = useRouter();

//     const handleAddToWatchlist = async (userId: string, id: string) => {
//         if (!isSignedIn) {
//             router.push('/sign-in');
//         } else {
//             setInWatchlist(true);
//             await addToWatchlist(userId, id);
//         }
//     }

//     const handleRemoveFromWatchlist = async (userId: string, id: string) => {
//         setInWatchlist(false);
//         await removeFromWatchlist(userId, id);
//     }

//     const handleAddToCompleted = async (userId: string, id: string, rating: string) => {
//         if (!isSignedIn) {
//             router.push('/sign-in');
//         } else {
//             setInCompleted(true);
//             rating === "liked" ? setIsLiked(true) : setIsLiked(false);
//             await addToCompleted(userId, id, rating);
//         }
//     }

//     const handleRemoveFromCompleted = async (userId: string, id: string) => {
//         if (!isSignedIn) {
//             router.push('/sign-in');
//         } else {
//             setInCompleted(false);
//             await removeFromCompleted(userId, id);
//         }
//     }

//     return (
//         <div className="h-80 w-60 flex items-center justify-center p-3 m-1">
//             <DirectionAwareHover imageUrl={imageURL}>
//                 <p className="font-bold text-xl">{movie.title}</p>
//                 <p className="font-normal text-sm">
//                     Duration: {movie.runtime}
//                     <br />
//                     Rating: {movie.vote_average.toFixed(1)}
//                 </p>
//                 <TooltipProvider>
//                     <div className="flex mb-1 mt-1 ">

//                         <div onClick={!inWatchlist ? () => handleAddToWatchlist(userId, movie.id) : () => handleRemoveFromWatchlist(userId, movie.id)} className="cursor-pointer mr-1">
//                             <Tooltip>
//                                 <TooltipTrigger asChild>
//                                     <div className="inline-block">
//                                         {!inWatchlist ? <BsPlusCircle className="text-white text-3xl" /> : <BsCheckCircle className="text-green-500 text-3xl" />}
//                                     </div>
//                                 </TooltipTrigger>
//                                 <TooltipContent className="transform translate-x-11">
//                                     {!inWatchlist ? <p>Add to watchlist</p> : <p> Remove from watchlist</p>}
//                                 </TooltipContent>
//                             </Tooltip>
//                         </div>

//                         {!inCompleted ?
//                             <Tooltip delayDuration={0}>
//                                 <TooltipTrigger asChild>
//                                     <div className="inline-block">
//                                         {!inCompleted ?
//                                             <BsHandThumbsUp className="text-white text-3xl" />
//                                             :
//                                             <div className="inline-block"> {isLiked ? <BsHandThumbsUp className="text-green-500 text-3xl" /> : <BsHandThumbsDown className="text-red-500 text-3xl" />}</div>}
//                                     </div>
//                                 </TooltipTrigger>
//                                 <TooltipContent >
//                                     {!inCompleted ?
//                                         <div className="flex">
//                                             <div onClick={() => handleAddToCompleted(userId, movie.id, "liked")} className="cursor-pointer">
//                                                 <div className="inline-block">
//                                                     <BsHandThumbsUp className="text-black dark:text-white text-3xl" />
//                                                 </div>
//                                             </div>
//                                             <div onClick={() => handleAddToCompleted(userId, movie.id, "disliked")} className="cursor-pointer">
//                                                 <div className="inline-block">
//                                                     <BsHandThumbsDown className="text-black dark:text-white text-3xl" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         :
//                                         <p> Remove from completed</p>}
//                                 </TooltipContent>
//                             </Tooltip>
//                             :
//                             <div onClick={() => handleRemoveFromCompleted(userId, movie.id)} className="cursor-pointer">
//                                 <Tooltip delayDuration={0}>
//                                     <TooltipTrigger asChild>
//                                         <div className="inline-block">
//                                             {!inCompleted ?
//                                                 <BsHandThumbsUp className="text-white text-3xl" />
//                                                 :
//                                                 <div className="inline-block"> {isLiked ? <BsHandThumbsUp className="text-green-500 text-3xl" /> : <BsHandThumbsDown className="text-red-500 text-3xl" />}</div>}
//                                         </div>
//                                     </TooltipTrigger>
//                                     <TooltipContent >
//                                         {!inCompleted ?
//                                             <div className="flex">
//                                                 <div onClick={() => handleAddToCompleted(userId, movie.id, "liked")} className="cursor-pointer">
//                                                     <div className="inline-block">
//                                                         <BsHandThumbsUp className="text-black dark:text-white text-3xl" />
//                                                     </div>
//                                                 </div>
//                                                 <div onClick={() => handleAddToCompleted(userId, movie.id, "disliked")} className="cursor-pointer">
//                                                     <div className="inline-block">
//                                                         <BsHandThumbsDown className="text-black dark:text-white text-3xl" />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             :
//                                             <p> Remove from completed</p>}
//                                     </TooltipContent>
//                                 </Tooltip>
//                             </div>
//                         }

//                     </div>
//                 </TooltipProvider>
//             </DirectionAwareHover>
//         </div >
//     );
// };

// interface WatchlistButtonProps {
//     userId: string;
//     movieId: string;
//     inWatchlist: boolean;
//     setInWatchlist: (inWatchlist: boolean) => void;
// }

// const WatchlistButton: React.FC<WatchlistButtonProps> = ({ userId, movieId, inWatchlist, setInWatchlist }) => {
//     const { isSignedIn } = useUser();
//     const router = useRouter();

//     const handleAddToWatchlist = async () => {
//         if (!isSignedIn) {
//             router.push('/sign-in');
//         } else {
//             setInWatchlist(true);
//             try {
//                 await addToWatchlist(userId, movieId);
//             } catch (error) {
//                 console.error("Failed to add to watchlist", error);
//                 setInWatchlist(false);
//             }
//         }
//     };

//     const handleRemoveFromWatchlist = async () => {
//         setInWatchlist(false);
//         try {
//             await removeFromWatchlist(userId, movieId);
//         } catch (error) {
//             console.error("Failed to remove from watchlist", error);
//             setInWatchlist(true);
//         }
//     };

//     return (
//         <div onClick={!inWatchlist ? handleAddToWatchlist : handleRemoveFromWatchlist} className="cursor-pointer mr-1">
//             <Tooltip>
//                 <TooltipTrigger asChild>
//                     <div className="inline-block">
//                         {!inWatchlist ? <BsPlusCircle className="text-white text-3xl" /> : <BsCheckCircle className="text-green-500 text-3xl" />}
//                     </div>
//                 </TooltipTrigger>
//                 <TooltipContent className={`transform translate-x-${inWatchlist ? '16' : '11'}`}>
//                     {!inWatchlist ? <p>Add to watchlist</p> : <p>Remove from watchlist</p>}
//                 </TooltipContent>
//             </Tooltip>
//         </div>
//     );
// };

// interface CompletedButtonProps {
//     userId: string;
//     movieId: string;
//     inCompleted: boolean;
//     isLiked: boolean;
//     setInCompleted: (inCompleted: boolean) => void;
//     setIsLiked: (isLiked: boolean) => void;
// }

// const CompletedButton: React.FC<CompletedButtonProps> = ({ userId, movieId, inCompleted, isLiked, setInCompleted, setIsLiked }) => {
//     const { isSignedIn } = useUser();
//     const router = useRouter();

//     const handleAddToCompleted = async (rating: string) => {
//         if (!isSignedIn) {
//             router.push('/sign-in');
//         } else {
//             setInCompleted(true);
//             setIsLiked(rating === "liked");
//             try {
//                 await addToCompleted(userId, movieId, rating);
//             } catch (error) {
//                 console.error("Failed to add to Completed list", error);
//                 setInCompleted(false);
//             }
//         }
//     };

//     const handleRemoveFromCompleted = async () => {
//         setInCompleted(false);
//         try {
//             await removeFromCompleted(userId, movieId);
//         } catch (error) {
//             console.error("Failed to remove from Completed list", error);
//             setInCompleted(true);
//         }
//     };

//     return (
//         <div>
//             <Tooltip delayDuration={0}>
//                 <TooltipTrigger asChild>
//                     <div className="inline-block cursor-pointer" onClick={inCompleted ? handleRemoveFromCompleted : undefined}>
//                         {inCompleted ?
//                             <div className="inline-block">
//                                 {isLiked ? <BsHandThumbsUp className="text-green-500 text-3xl" /> : <BsHandThumbsDown className="text-red-500 text-3xl" />}
//                             </div>
//                             :
//                             <BsHandThumbsUp className="text-white text-3xl" />
//                         }
//                     </div>
//                 </TooltipTrigger>
//                 <TooltipContent className={`transform translate-x-${inCompleted ? '9' : '0'}`}>
//                     {!inCompleted ?
//                         <div className="flex  cursor-pointer gap-1">
//                             <BsHandThumbsUp onClick={() => handleAddToCompleted("liked")} className="text-black dark:text-white text-3xl" />
//                             <BsHandThumbsDown onClick={() => handleAddToCompleted("disliked")} className="text-black dark:text-white text-3xl" />
//                         </div>
//                         :
//                         <p>Remove from completed</p>
//                     }
//                 </TooltipContent>
//             </Tooltip>
//         </div>
//     );
// };

"use server";
import React from "react";
import { ImageHover } from "./ui/ImageHover";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WatchlistButton } from "@/components/WatchlistButton";
import { CompletedButton } from "@/components/CompletedButton";

import Link from "next/link";

type MovieCardProps = {
    userId: string;
    movie: any;
    isLCP: boolean;
};

export default async function MovieCard({ movie, userId, isLCP }: MovieCardProps) {

    // console.log("movieCard rendered");
    let imageURL = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    if (imageURL.endsWith("null")) imageURL = "/posterPlaceHolder.jpg";
    // const imageURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBgFZfYsQAAAAASUVORK5CYII="

    return (
        <div className='h-80 w-60 flex items-center justify-center p-3 m-1'>
            <ImageHover imageUrl={imageURL} isLCP={isLCP}>
                <p className='font-bold text-xl'>
                    <Link
                        href={`https://www.google.com/search?q=${movie.title}&newwindow=1`}
                        target='_blank'
                        className=' hover:text-emerald-400'
                    >
                        {movie.title}
                    </Link>
                </p>
                <p className='font-normal text-sm'>
                    Duration:{" "}
                    {movie.runtime ? `${movie.runtime} minutes` : "N/A"}
                    <br />
                    Rating: {movie.vote_average.toFixed(1)}
                </p>
                <TooltipProvider>
                    <div className='flex mb-2 mt-1'>
                        <WatchlistButton userId={userId} movie={movie} />
                        <CompletedButton userId={userId} movie={movie} />
                    </div>
                </TooltipProvider>
            </ImageHover>
        </div>
    );
}
