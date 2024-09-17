"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { BsHandThumbsUpFill, BsHandThumbsDownFill } from "react-icons/bs";
import { addToCompleted, removeFromCompleted } from "@/lib/actions/database";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CompletedListButtonWrapperProps } from "@/lib/types/types";

export function CompletedListButtonWrapper({
  userId,
  movie,
  likedButton,
  dislikedButton,
  triggerButton,
  className,
}: CompletedListButtonWrapperProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [inCompleted, setInCompleted] = useState(movie.inCompleted);
  const [isLiked, setIsLiked] = useState(movie.isLiked);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openSignIn } = useClerk();

  const handleToggleCompleted = async (action: string, rating: string = "") => {
    if (!isSignedIn) {
      openSignIn();
    } else {
      setInCompleted(!inCompleted);
      if (action === "add") setIsLiked(rating === "liked");

      try {
        if (action === "add") {
          await addToCompleted(userId, String(movie.id), rating);
        } else {
          await removeFromCompleted(userId, String(movie.id));
          if (pathname === "/completed") router.refresh();
        }
      } catch (error) {
        console.error(
          `Failed to ${
            action === "add" ? "add to" : "remove from"
          } Completed list`,
          error,
        );
        setInCompleted(!inCompleted);
      }
    }
  };

  return (
    <>
      {inCompleted ? (
        isLiked ? (
          <div
            onClick={() => handleToggleCompleted("remove")}
            aria-label="Remove from completed list"
            className={className}
          >
            {likedButton}
          </div>
        ) : (
          <div
            onClick={() => handleToggleCompleted("remove")}
            aria-label="Remove from completed list"
            className={className}
          >
            {dislikedButton}
          </div>
        )
      ) : (
        <>
          {/* Modal for user to choose between liked and disliked */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>{triggerButton}</DialogTrigger>
            <DialogContent className="max-w-[80%] rounded-md bg-[#312F2F] sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="">Add to Completed</DialogTitle>
              </DialogHeader>

              <div className="mt-4 flex justify-center gap-4">
                {/* Thumbs Up button for liking the movie */}
                <Button
                  className="flex flex-1 items-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 sm:max-w-[425px]"
                  onClick={() => {
                    handleToggleCompleted("add", "liked");
                    setIsModalOpen(false);
                  }}
                >
                  <BsHandThumbsUpFill className="mr-2" /> Liked
                </Button>

                {/* Thumbs Down button for disliking the movie */}
                <Button
                  className="flex flex-1 items-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  onClick={() => {
                    handleToggleCompleted("add", "disliked");
                    setIsModalOpen(false);
                  }}
                >
                  <BsHandThumbsDownFill className="mr-2" /> Disliked
                </Button>
              </div>

              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 flex-1 bg-secondary-color hover:bg-secondary-color-dark"
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
