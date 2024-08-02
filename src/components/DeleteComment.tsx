"use client";
import { removeComment } from "@/lib/database";
import { useActionState } from "react";

export default function DeleteComment({ commentId }: { commentId: string }) {
  const [state, action, isPending] = useActionState(removeComment, null);

  return (
    <button
      onClick={() => action(commentId)}
      className="self-end text-red-500"
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
