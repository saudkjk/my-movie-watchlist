"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent } from "react";
import { addComment } from "@/lib/database";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type CommentFormProps = {
  username: string;
  targetUserId: string;
  currentUserId: string;
};

export default function CommentSection({
  username,
  targetUserId,
  currentUserId,
}: CommentFormProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (!isSignedIn) {
      router.push("/sign-in");
    } else {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const comment = formData.get("comment");

      if (comment) {
        addComment(currentUserId, targetUserId, String(comment));
      }

      event.currentTarget.reset();
    }
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
      <form onSubmit={onSubmit}>
        <Textarea
          name="comment"
          placeholder="Type your comment here."
          disabled={!isSignedIn}
        />
        {isSignedIn ? (
          <div className="mt-2 flex justify-end gap-2">
            <Button type="submit">Comment</Button>
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
