import {
  getCustomListDetails,
  getMoviesFromCustomList,
  isListLikedByUser,
} from "@/lib/actions/database";
import { fetchMoviesByIdsWithDbStatus } from "@/lib/actions/API";
import Image from "next/image";
import DisplayMovies from "@/components/DisplayMovies";
import { getUserInfo } from "@/lib/helpers";
import LikeListButton from "@/components/LikeListButton";
import CommentForm from "@/components/comments-components/CommentForm";
import DisplayComments from "@/components/comments-components/DisplayComments";

type PagePropss = {
  params: {
    list_id: string;
  };
};

export default async function Page({ params }: PagePropss) {
  const listid = params.list_id;
  const { userId, username } = await getUserInfo();

  const customlistDetails = await getCustomListDetails(listid);
  const isLikeByUser = await isListLikedByUser(listid, userId);

  const customlistMoviesIds = (await getMoviesFromCustomList(listid)).movieIds;
  const movies = await fetchMoviesByIdsWithDbStatus(
    customlistMoviesIds,
    userId,
  );

  return (
    <>
      <div className="w-full">
        <div className="relative flex max-h-[80vh] w-1/3">
          {movies.slice(0, 3).map((movie) => (
            <Image
              key={movie.id}
              src={`https://image.tmdb.org/t/p/original${movie.images.posters[0].file_path}`}
              alt="Description"
              width={3000}
              height={2000}
              className="brightness-90"
              style={{ objectFit: "cover" }}
            />
          ))}
        </div>
      </div>
      <div className="mb-[25px] bg-black/30 py-[10px] md:py-[20px]">
        <div className="mx-[4%] md:mx-[8%]">
          <div className="flex w-full flex-col justify-between">
            <div className="flex w-full justify-between">
              <div className="text-2xl font-bold md:text-3xl xl:text-5xl">
                {customlistDetails.customList!.name}
              </div>
              <div className="hidden md:flex">
                <LikeListButton
                  listid={listid}
                  userId={userId}
                  initialIsLiked={isLikeByUser}
                  username={customlistDetails.customList!.username}
                ></LikeListButton>
              </div>
            </div>

            <div className="mb-[10px] text-base font-semibold text-gray-400 md:text-lg xl:text-xl">
              list by {customlistDetails.customList!.username}
            </div>
            <div className="mb-[10px] text-sm font-medium md:mb-[0] md:text-base xl:text-lg">
              {customlistDetails.customList!.description}
            </div>
          </div>
          <div className="flex w-full md:hidden">
            <LikeListButton
              listid={listid}
              userId={userId}
              initialIsLiked={isLikeByUser}
              username={customlistDetails.customList!.username}
            ></LikeListButton>
          </div>
        </div>
      </div>
      <div className="mx-[4%] md:mx-[8%]">
        <DisplayMovies movies={movies} userId={userId} username={username} />
      </div>

      <CommentForm username={username} listid={listid} userId={userId} />

      <DisplayComments
        userId={userId}
        comments={customlistDetails.customList?.comments.reverse() || []}
      />
    </>
  );
}
