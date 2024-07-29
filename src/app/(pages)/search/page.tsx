"use server";
import DisplayMovies from "@/components/DisplayMovies";
import { updateWithDatabaseStatus } from "@/lib/database";
import { fetchMoviesQueries } from "@/lib/API";
import { auth } from "@clerk/nextjs/server";
import PaginationControls from "@/components/PaginationControls";
import PageTitle from "@/components/PageTitle";

type PageProps = {
    searchParams: {
        query?: string;
        page?: number;
    };
};

export default async function Page({ searchParams }: PageProps) {
    const myQuery = searchParams?.query || "";
    const myPageNumber = searchParams.page || 1;

    const results = await fetchMoviesQueries(myQuery, myPageNumber);

    const clerkUser = await auth().userId;
    const updatedResults = !clerkUser
        ? results
        : await updateWithDatabaseStatus(String(clerkUser), results);

    return (
        <>
            {results && results.length > 0 && (
                <div>
                    <PageTitle title={`Search results for: "${myQuery}"`} />
                    <DisplayMovies
                        results={updatedResults}
                        userId={clerkUser!}
                    />
                    <PaginationControls />
                </div>
            )}
            <div className='flex items-center justify-center mt-3'>
                {results && results.length === 0 && (
                    <p className='text-2xl text-center font-semibold text-gray-700 dark:text-gray-200'>
                        No Results
                    </p>
                )}
            </div>
        </>
    );
}
