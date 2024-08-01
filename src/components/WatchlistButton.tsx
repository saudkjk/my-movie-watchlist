"use client";
import { BsCheckCircle, BsPlusCircle } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { addToWatchlist, removeFromWatchlist } from "@/lib/database";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { WatchlistButtonProps } from "@/types/types";

export function WatchlistButton({
  currentUserId,
  movie,
}: WatchlistButtonProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { openSignIn } = useClerk();

  const [inWatchlist, setInWatchlist] = useState(movie.inWatchlist);

  const handleUpdateWatchlist = async (action: string) => {
    if (!isSignedIn) {
      openSignIn();
    } else {
      setInWatchlist(!inWatchlist);

      try {
        if (action === "add") {
          await addToWatchlist(currentUserId, movie.id);
        } else if (action === "remove") {
          await removeFromWatchlist(currentUserId, movie.id);
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
          className="mr-1 inline-block cursor-pointer"
        >
          {!inWatchlist ? (
            <BsPlusCircle className="text-2xl text-white sm:text-3xl" />
          ) : (
            <BsCheckCircle className="text-2xl text-green-500 sm:text-3xl" />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent
        className={`transform translate-x-${inWatchlist ? "16" : "11"}`}
      >
        {!inWatchlist ? <p>Add to watchlist</p> : <p>Remove from watchlist</p>}
      </TooltipContent>
    </Tooltip>
  );
}
