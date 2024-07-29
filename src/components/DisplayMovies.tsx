"use server";
import React from "react";
import MovieCard from "./MovieCard";

interface Movie {
    id: string;
    title: string;
    runtime?: number;
    vote_average: number;
    poster_path?: string;
    isLiked: boolean | null;
    inWatchlist: boolean | null;
    inCompleted: boolean | null;
}

interface DisplayMoviesProps {
    results: Movie[];
    userId: string;
}

export default async function DisplayMovies({ results, userId, }: DisplayMoviesProps) {
    return (
        <div className='flex flex-wrap justify-center'>
            {results.map((movie) => (
                <div key={movie.id}>
                    <MovieCard movie={movie} userId={userId} />
                </div>
            ))}
        </div>
    );
}
