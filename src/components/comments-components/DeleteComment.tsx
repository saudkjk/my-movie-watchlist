"use client";
import { useState } from "react";
import { removeComment } from "@/lib/actions/database";

export default function DeleteComment({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);
    try {
      await removeComment(commentId, userId);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`self-end text-red-500 hover:text-red-600 ${isPending ? "cursor-not-allowed opacity-50" : ""}`}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
