import {
  FaBookmark,
  FaCheck,
  FaCirclePlus,
  FaRegBookmark,
} from "react-icons/fa6";
import { Movie } from "@/lib/types/types";
import AddToListButtonWrapper from "../add-to-list-components/AddToListButtonWrapper";
import { WatchlistButton } from "../movie-card-components/WatchlistButton";
import { BsHandThumbsDownFill, BsHandThumbsUpFill } from "react-icons/bs";
import { CompletedListButtonWrapper } from "../movie-card-components/CompletedListButtonWrapper";

export default function MoviePageDesktopActions({
  movie,
  userId,
  username,
}: {
  movie: Movie;
  userId: string;
  username: string;
}) {
  return (
    <div
      key={movie.title}
      className="flex-1 translate-y-10 transform animate-fade-in-up opacity-0 delay-300"
    >
      <AddToListButtonWrapper
        userId={userId}
        movie={movie}
        username={username}
        triggerComponent={
          <button
            className={`mb-[16px] flex w-full items-center justify-center gap-2 rounded-full bg-main-color py-2 transition duration-300 ease-in-out hover:bg-main-color-dark active:bg-main-color-darkest`}
          >
            <FaCirclePlus className="h-[20px] w-[20px]" />
            <span className="flex items-center text-xs font-medium uppercase md:text-base">
              add to list
            </span>
          </button>
        }
      />
      <div className="mb-1 flex items-center gap-4">
        <WatchlistButton
          movie={movie}
          userId={userId!}
          className="flex flex-1 items-center justify-center text-nowrap"
          notInWatchlistButton={
            <button className="flex h-[40px] flex-1 items-center justify-center gap-2 rounded-full bg-secondary-color py-2 transition duration-300 ease-in-out hover:bg-secondary-color-dark active:bg-secondary-color-darkest">
              <FaRegBookmark className="h-[18px] w-[18px]" />
              <span className="flex items-center text-xs font-medium uppercase md:text-sm">
                add to watchlist
              </span>
            </button>
          }
          inWatchlistButton={
            <button className="flex h-[40px] flex-1 items-center justify-center gap-2 rounded-full bg-gray-100 py-2 text-gray-800 transition duration-300 ease-in-out hover:bg-gray-200 active:bg-gray-300">
              <FaBookmark className="h-[18px] w-[18px]" />
              <span className="flex items-center text-xs font-medium uppercase md:text-sm">
                remove from watchlist
              </span>
            </button>
          }
        />
        <CompletedListButtonWrapper
          movie={movie}
          userId={userId!}
          className="flex flex-1 items-center justify-center text-nowrap"
          triggerButton={
            <button
              className={`flex h-[40px] flex-1 items-center justify-center gap-2 rounded-full bg-secondary-color transition duration-300 ease-in-out hover:bg-secondary-color-dark active:bg-secondary-color-darkest`}
            >
              <FaCheck className="h-[20px] w-[20px]" />
              <span className="flex items-center text-xs font-medium uppercase md:text-sm">
                add to seen
              </span>
            </button>
          }
          dislikedButton={
            <button
              className={`flex h-[40px] flex-1 items-center justify-center gap-2 rounded-full bg-red-500 transition duration-300 ease-in-out hover:bg-red-600 active:bg-red-700`}
            >
              <BsHandThumbsDownFill className="h-[20px] w-[20px]" />
              <span className="flex items-center text-xs font-medium uppercase md:text-sm">
                remove from seen
              </span>
            </button>
          }
          likedButton={
            <button
              className={`flex h-[40px] flex-1 items-center justify-center gap-2 rounded-full bg-green-500 transition duration-300 ease-in-out hover:bg-green-600 active:bg-green-700`}
            >
              <BsHandThumbsUpFill className="h-[20px] w-[20px]" />
              <span className="flex items-center text-xs font-medium uppercase md:text-sm">
                remove from seen
              </span>
            </button>
          }
        />
      </div>
    </div>
  );
}
