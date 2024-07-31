"use client";
import { removeComment } from "@/lib/database";

export default function DeleteComment({ commentId }: { commentId: string }) {
  const handleDelete = async () => {
    try {
      await removeComment(commentId);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="self-end text-red-500 hover:text-red-700"
    >
      Delete
    </button>
  );
}
