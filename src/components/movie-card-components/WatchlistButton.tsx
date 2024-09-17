"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { addToWatchlist, removeFromWatchlist } from "@/lib/actions/database";
import { WatchlistButtonProps } from "@/lib/types/types";

export function WatchlistButton({
  userId,
  movie,
  inWatchlistButton,
  notInWatchlistButton,
  className,
}: WatchlistButtonProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const [inWatchlist, setInWatchlist] = useState(movie.inWatchlist);
  const { openSignIn } = useClerk();

  const handleToggleWatchlist = async () => {
    if (!isSignedIn) {
      openSignIn();
    } else {
      try {
        if (inWatchlist) {
          await removeFromWatchlist(userId, String(movie.id));
        } else {
          await addToWatchlist(userId, String(movie.id));
        }

        setInWatchlist(!inWatchlist);

        // If user is on the watchlist page, refresh it after removal
        if (pathname === "/watchlist") router.refresh();
      } catch (error) {
        console.error(
          `Failed to ${inWatchlist ? "remove from" : "add to"} watchlist`,
          error,
        );
      }
    }
  };

  return (
    <div className={className} onClick={handleToggleWatchlist}>
      {inWatchlist ? inWatchlistButton : notInWatchlistButton}
    </div>
  );
}
