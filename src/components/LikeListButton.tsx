"use client";
import {
  addToCustomlistLikes,
  removeFromCustomlistLikes,
} from "@/lib/actions/database";
import { useClerk, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { FaHeart } from "react-icons/fa6";

type LikeListButtonProps = {
  listid: string;
  userId: string;
  initialIsLiked: boolean;
  username: string;
};

export default function LikeListButton({
  listid,
  userId,
  initialIsLiked,
  username,
}: LikeListButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const handleToggleLike = async () => {
    if (!isSignedIn) {
      openSignIn();
    } else {
      try {
        if (!isLiked) {
          await addToCustomlistLikes(listid, userId);
        } else {
          await removeFromCustomlistLikes(listid, userId);
        }

        setIsLiked(!isLiked);
      } catch (error) {
        console.error(
          `Failed to ${!isLiked ? "like list" : "remove like from list"}`,
          error,
        );
      }
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      className={`flex flex-grow items-center justify-center gap-2 rounded-full px-4 py-2 text-sm transition duration-300 ease-in-out md:py-1 ${
        isLiked
          ? "bg-main-color hover:bg-main-color-dark active:bg-main-color-darkest"
          : "bg-secondary-color hover:bg-secondary-color-dark active:bg-secondary-color-darkest"
      } `}
    >
      <FaHeart className="h-[20px] w-[20px]" />
      <span className="flex items-center text-base font-medium">
        {!isLiked ? `Like ${username}'s list` : `Unlike ${username}'s list`}
      </span>
    </button>
  );
}
