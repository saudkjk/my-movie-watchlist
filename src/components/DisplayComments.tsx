"use server";
import Image from "next/image";
import DeleteComment from "./DeleteComment";
import { getUserWatchlistComments, removeComment } from "@/lib/database";
import { CommentsProps, User, Comment, UserComment } from "@/types/types";

export default async function DisplayComments({
  currentWatchlistUserId,
  usersList,
  currentUserId,
}: CommentsProps) {
  // get watchlist comments
  const currentWatchlistComments =
    (await getUserWatchlistComments(currentWatchlistUserId)).data || [];

  // get users information
  const users = usersList.map((user: User) => ({
    username: user.username,
    imageUrl: user.imageUrl,
    id: user.id,
  }));

  // group comments by user
  const userComments = currentWatchlistComments.reduce(
    (acc: UserComment[], comment: Comment) => {
      const user = users.find((user: User) => user.id === comment.userId);
      if (user) {
        acc.push({ user, comment });
      } else {
        console.error(`No user found for comment with ID: ${comment.id}`);
      }
      return acc;
    },
    [],
  );

  return (
    <div className="mx-auto my-4 mt-7 flex max-w-[600px] flex-col gap-4 md:mx-20 md:max-w-[100%]">
      {userComments?.map(({ user, comment }) => (
        <div
          key={comment.id}
          className="flex justify-between rounded-lg border p-4 shadow-sm"
        >
          <div>
            <div className="mb-2 flex items-center gap-4">
              {user.imageUrl && user.username && (
                <Image
                  src={user.imageUrl}
                  alt={user.username}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}
              <div>
                <div className="text-md font-semibold">{user.username}</div>
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
      ))}
    </div>
  );
}
