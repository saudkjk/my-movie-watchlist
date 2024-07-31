"use server";
import Image from "next/image";
import DeleteComment from "./DeleteComment"; // Adjust the import path as needed
import { getUserWatchlistComments } from "@/lib/database";

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
  id: string;
};

type CommentsProps = {
  currentWatchlistUserId: string;
  usersList: any;
  currentUserId: string;
};

export default async function DisplayComments({
  currentWatchlistUserId,
  usersList,
  currentUserId,
}: CommentsProps) {
  // get watchlist comments
  const currentWatchlistComments = await getUserWatchlistComments(
    currentWatchlistUserId,
  );

  // get users information
  const users = usersList.data.map((user: User) => ({
    username: user.username,
    imageUrl: user.imageUrl,
    id: user.id,
  }));

  return (
    <div className="mx-auto my-4 mt-7 flex max-w-[600px] flex-col gap-4 md:mx-20 md:max-w-[100%]">
      {currentWatchlistComments.data?.map((comment: Comment) => {
        const user = users.find((user: User) => user.id === comment.userId);
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
            {currentUserId === comment.userId && (
              <DeleteComment commentId={comment.id} />
            )}
          </div>
        );
      })}
    </div>
  );
}
