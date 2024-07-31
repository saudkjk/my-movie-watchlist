"use client";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { addToCompleted, removeFromCompleted } from "@/lib/database";
import { useState } from "react";

type CompletedButtonProps = {
  currentUserId: string;
  movie: any;
};

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
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <div
          className={`inline-block ${inCompleted ? "cursor-pointer" : ""}`}
          onClick={
            inCompleted ? () => handleToggleCompleted("remove") : undefined
          }
        >
          {inCompleted ? (
            <div className="">
              {isLiked ? (
                <BsHandThumbsUp className="text-3xl text-green-500" />
              ) : (
                <BsHandThumbsDown className="text-3xl text-red-500" />
              )}
            </div>
          ) : (
            <BsHandThumbsUp className="text-3xl text-white" />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent
        className={`transform translate-x-${inCompleted ? "9" : "0"}`}
      >
        {!inCompleted ? (
          <div className="flex cursor-pointer">
            <BsHandThumbsUp
              onClick={() => handleToggleCompleted("add", "liked")}
              className="text-3xl text-black dark:text-white"
            />
            <BsHandThumbsDown
              onClick={() => handleToggleCompleted("add", "disliked")}
              className="text-3xl text-black dark:text-white"
            />
          </div>
        ) : (
          <p>Remove from completed</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
