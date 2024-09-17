"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { CommentFormProps } from "@/lib/types/types";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { addComment } from "@/lib/actions/database";

const commentSchema = z.object({
  comment: z.string().trim().min(1, { message: "Comment cannot be empty" }),
});

type CommentFormSchema = z.infer<typeof commentSchema>;

export default function CommentSection({
  username,
  listid,
  userId,
}: CommentFormProps) {
  const { isSignedIn } = useUser();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<CommentFormSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data: CommentFormSchema) => {
    setIsPending(true);
    try {
      const response = await addComment(userId, listid, username, data.comment);
      if (response.status === 200) {
        form.reset();
      } else {
        console.error("Failed to add comment:", response.message);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="mx-[4%] mt-[50px] flex justify-center md:mx-[8%]">
      <div className="flex w-full flex-col md:max-w-[700px] lg:max-w-[60vw]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="text-lg font-semibold">
                      Comment on{" "}
                      <span className="font-bold">{username}`s </span>
                      list
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your comment here."
                      disabled={!isSignedIn || isPending}
                      {...field}
                    />
                  </FormControl>
                  <div className="min-h-[10px]">
                    <FormMessage className="h-[10px]" />
                  </div>
                </FormItem>
              )}
            />

            {isSignedIn ? (
              <div className="flex justify-end">
                <Button
                  className="bg-secondary-color hover:bg-secondary-color-dark active:bg-secondary-color-darkest"
                  type="submit"
                  disabled={isPending}
                >
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
        </Form>
      </div>
    </div>
  );
}
