"use client";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { addToCompleted, removeFromCompleted } from "@/lib/database";
import { useState } from "react";
import { CompletedButtonProps } from "@/types/types";

export function CompletedButton({
  currentUserId,
  movie,
}: CompletedButtonProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const [inCompleted, setInCompleted] = useState(movie.inCompleted);
  const [isLiked, setIsLiked] = useState(movie.isLiked);
  const { openSignIn } = useClerk();

  const handleToggleCompleted = async (action: string, rating: string = "") => {
    if (!isSignedIn) {
      openSignIn();
    } else {
      setInCompleted(!inCompleted);

      if (action === "add") setIsLiked(rating === "liked");

      try {
        if (action === "add") {
          await addToCompleted(currentUserId, movie.id, rating);
        } else {
          await removeFromCompleted(currentUserId, movie.id);
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
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div
              className="inline-block cursor-pointer"
              onClick={() => handleToggleCompleted("remove")}
              aria-label="Remove from completed"
            >
              {isLiked ? (
                <BsHandThumbsUp className="text-2xl text-green-500 sm:text-3xl" />
              ) : (
                <BsHandThumbsDown className="text-2xl text-red-500 sm:text-3xl" />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove from completed</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <div
              className="inline-block cursor-pointer"
              aria-label="Add to completed"
            >
              <BsHandThumbsUp className="text-2xl text-white sm:text-3xl" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="m-1 max-w-[70px] p-1">
            <div className="flex cursor-pointer justify-center text-2xl text-black dark:text-white sm:text-3xl">
              <BsHandThumbsUp
                onClick={() => handleToggleCompleted("add", "liked")}
                aria-label="Mark as liked"
              />
              <BsHandThumbsDown
                onClick={() => handleToggleCompleted("add", "disliked")}
                aria-label="Mark as disliked"
              />
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
