"use client";
import { removeComment } from "@/lib/database";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteComment({ commentId }: { commentId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    await removeComment(commentId);
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="self-end text-red-500"
      disabled={isLoading}
    >
      {isLoading ? "Deleting..." : "Delete"}
    </button>
  );
}
