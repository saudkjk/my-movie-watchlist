"use client";
import { Textarea } from "@/components/ui/textarea";
import { CommentFormProps } from "@/lib/types/types";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useActionState, useRef } from "react";
import { addComment } from "@/lib/actions/database";
import { Button } from "@/components/ui/button";

export default function CommentSection({
  username,
  targetUserId,
  currentUserId,
}: CommentFormProps) {
  const { isSignedIn } = useUser();
  const ref = useRef<HTMLFormElement>(null);

  const boundAddComment = addComment.bind(null, currentUserId, targetUserId);
  const [state, formAction, isPending] = useActionState(boundAddComment, null);

  return (
    <div className="mx-auto mt-7 grid max-w-[600px] gap-2 md:mx-20 md:max-w-[100%]">
      <div className="text-lg font-semibold">
        Comment on watchlist or suggest movies to{" "}
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text font-bold text-transparent">
          {username}
        </span>
      </div>

      <p className="text-sm text-muted-foreground">
        Your comment is public and will be viewable by everyone
      </p>

      <form action={formAction} ref={ref}>
        <Textarea
          name="comment"
          placeholder="Type your comment here."
          disabled={!isSignedIn}
          required
        />

        {isSignedIn ? (
          <div className="mt-2 flex justify-end gap-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Comment"}
            </Button>
          </div>
        ) : (
          <SignInButton
            fallbackRedirectUrl={`/browse/${username}`}
            mode="modal"
          >
            <div className="my-2 cursor-pointer gap-2 font-semibold text-red-500 hover:text-blue-600">
              Login to comment
            </div>
          </SignInButton>
        )}
      </form>
    </div>
  );
}
