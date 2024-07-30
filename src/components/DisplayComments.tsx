"use client";
import { removeComment } from "@/lib/database";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

type Comment = {
  id: string;
  userId: string;
  targetUserId: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  username: string | null;
  imageUrl: string;
  userId: string;
};

type CommentsProps = {
  comments: Comment[];
  users: User[];
};

export default function DisplayComments({ comments, users }: CommentsProps) {
  const clerkUser = useUser();
  const handleDelete = async (commentId: string) => {
    try {
      await removeComment(commentId);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };
  return (
    <div className="mx-auto my-4 mt-7 flex max-w-[600px] flex-col gap-4 md:mx-20 md:max-w-[100%]">
      {comments.map((comment) => {
        const user = users.find((user) => user.userId === comment.userId);
        if (!user) return null;
        const { imageUrl, username } = user;
        return (
          <div
            key={comment.id}
            className="flex justify-between rounded-lg border p-4 shadow-sm"
          >
            <div>
              <div className="mb-2 flex items-center gap-4">
                {imageUrl && username && (
                  <Image
                    src={imageUrl}
                    alt={username}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                )}
                <div>
                  <div className="text-md font-semibold">{username}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              {comment.comment}
            </div>
            {clerkUser.user?.id === comment.userId && (
              <button
                onClick={() => handleDelete(comment.id)}
                className="self-end text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
