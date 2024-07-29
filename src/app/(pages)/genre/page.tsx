"use server";
import DisplayMovies from "@/components/DisplayMovies";
import PageTitle from "@/components/PageTitle";
import { fetchMoviesByGenre, fetchMoviesTopTrending } from "@/lib/API";
import { updateWithDatabaseStatus } from "@/lib/database";
import { auth } from "@clerk/nextjs/server";
import genres from "@/lib/genres.json";
import PaginationControls from "@/components/PaginationControls";

type PageProps = {
    searchParams: {
        genre: string;
        page: number;
    };
};

export default async function Page({ searchParams }: PageProps) {
    const myGenre = searchParams.genre;
    const myPageNumber = searchParams.page;

    // Find the genre ID from the genre name
    const genreId = genres.genres.find(
        (g) => g.name.toLowerCase() === myGenre.toLowerCase()
    )?.id;

    let results;
    if (myGenre === "toprated" || myGenre === "trending") {
        results = await fetchMoviesTopTrending(myGenre, myPageNumber);
    } else if (genreId) {
        results = await fetchMoviesByGenre(genreId, myPageNumber);
    } else {
        throw new Error("Invalid genre");
    }

    const clerkUser = await auth().userId;
    const updatedResults = clerkUser
        ? await updateWithDatabaseStatus(String(clerkUser), results)
        : results;

    return (
        <>
            <PageTitle
                title={
                    myGenre === "toprated"
                        ? "Top Rated"
                        : myGenre === "trending"
                        ? "Trending"
                        : myGenre.charAt(0).toUpperCase() + myGenre.slice(1)
                }
            />
            <DisplayMovies results={updatedResults} userId={clerkUser!} />
            <PaginationControls />
        </>
    );
}
