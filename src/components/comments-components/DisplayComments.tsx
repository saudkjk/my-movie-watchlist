import { CommentsProps } from "@/lib/types/types";
import DeleteComment from "./DeleteComment";

export default async function DisplayComments({
  comments,
  userId,
}: CommentsProps) {
  return (
    <div className="mx-[4%] mt-[50px] flex justify-center md:mx-[8%]">
      <div className="mb-[30px] flex w-full flex-col gap-4 md:max-w-[700px] lg:max-w-[60vw]">
        <div className="text-lg font-semibold">Comments:</div>
        {comments.length === 0 ? (
          <div className="font-medium">No comments yet</div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex justify-between rounded-lg border p-4 shadow-sm"
            >
              <div>
                <div className="mb-2 flex items-center gap-4">
                  <div>
                    <div className="text-md font-semibold">
                      {comment.username}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                {comment.content}
              </div>
              {userId === comment.userId && (
                <DeleteComment commentId={comment.id} userId={userId} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
