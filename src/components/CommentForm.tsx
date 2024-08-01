"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addComment } from "@/lib/database";
import { CommentFormProps } from "@/types/types";
import { SignInButton, useUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { z } from "zod";
import CommentButton from "./CommentButton";

const commentSchema = z.object({
  comment: z.string().min(1, "Comment cannot be empty"),
});

export default function CommentSection({
  username,
  targetUserId,
  currentUserId,
}: CommentFormProps) {
  const { isSignedIn } = useUser();
  const ref = useRef<HTMLFormElement>(null);

  async function formAction(formData: FormData) {
    ref.current?.reset();
    const comment = formData.get("comment");

    const validation = commentSchema.safeParse({ comment });

    if (!validation.success) {
      console.error(validation.error.errors);
      return;
    }

    if (comment)
      await addComment(currentUserId, targetUserId, String(comment), username);
  }

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
        />
        {isSignedIn ? (
          <div className="mt-2 flex justify-end gap-2">
            <CommentButton />
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
