"use client";
import { BsCheckCircle, BsPlusCircle } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { addToWatchlist, removeFromWatchlist } from "@/lib/database";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

type WatchlistButtonProps = {
    userId: string;
    movie: any;
};

export function WatchlistButton({ userId, movie }: WatchlistButtonProps) {
    const { isSignedIn } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    const [inWatchlist, setInWatchlist] = useState(movie.inWatchlist);

    const handleUpdateWatchlist = async (action: string) => {
        if (!isSignedIn) {
            router.push("/sign-in");
        } else {
            setInWatchlist(!inWatchlist);

            try {
                if (action === "add") {
                    await addToWatchlist(userId, movie.id);
                } else if (action === "remove") {
                    await removeFromWatchlist(userId, movie.id);
                    if (pathname === "/watchlist") router.refresh();
                }
            } catch (error) {
                console.error(`Failed to ${action} watchlist`, error);
                setInWatchlist(!inWatchlist);
            }
        }
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    onClick={() =>
                        !inWatchlist
                            ? handleUpdateWatchlist("add")
                            : handleUpdateWatchlist("remove")
                    }
                    className='inline-block cursor-pointer mr-1'
                >
                    {!inWatchlist ? (
                        <BsPlusCircle className='text-white text-3xl' />
                    ) : (
                        <BsCheckCircle className='text-green-500 text-3xl' />
                    )}
                </div>
            </TooltipTrigger>
            <TooltipContent
                className={`transform translate-x-${inWatchlist ? "16" : "11"}`}
            >
                {!inWatchlist ? (
                    <p>Add to watchlist</p>
                ) : (
                    <p>Remove from watchlist</p>
                )}
            </TooltipContent>
        </Tooltip>
    );
};
