"use client";
import { removeComment } from "@/lib/database";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteComment({ commentId }: { commentId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await removeComment(commentId);
    } catch (error) {
      console.error("Failed to delete comment:", error);
      setIsLoading(false);
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="self-end text-red-500 hover:text-red-700"
      disabled={isLoading}
    >
      {isLoading ? "Deleting..." : "Delete"}
    </button>
  );
}
