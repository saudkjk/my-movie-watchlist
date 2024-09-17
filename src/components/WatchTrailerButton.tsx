"use client";
import { HiPlayCircle } from "react-icons/hi2";
import { useState } from "react";
import ReactPlayer from "react-player";
import { getTrailerUrl } from "@/lib/actions/API";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WatchTrailerButtonProps {
  movieId: number; // Movie ID used to fetch the trailer
}

export default function WatchTrailerButton({
  movieId,
}: WatchTrailerButtonProps) {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  const handleWatchTrailer = async () => {
    const url = await getTrailerUrl(movieId); // Fetch the trailer URL
    setTrailerUrl(url);
    setShowTrailerModal(true); // Open the modal
  };

  return (
    <>
      <Button
        onClick={handleWatchTrailer}
        className={`bg-main-color md:mb-[10px]  flex-1 hover:bg-main-color-dark active:bg-main-color-darkest flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2 transition duration-300 ease-in-out`}
      >
        <HiPlayCircle className="h-[20px] w-[20px] md:h-[25px] md:w-[25px]" />
        <span className="text-xs font-medium uppercase md:text-base">
          watch trailer
        </span>
      </Button>

      {/* Trailer Modal */}
      <Dialog open={showTrailerModal} onOpenChange={setShowTrailerModal}>
        <DialogContent className="w-[90%] overflow-hidden border-transparent p-0 sm:max-w-4xl">
          <div className="relative aspect-video w-full">
            {trailerUrl ? (
              <ReactPlayer
                url={trailerUrl}
                playing
                controls
                width="100%"
                height="100%"
              />
            ) : (
              <p className="text-center text-white">Trailer not available.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
