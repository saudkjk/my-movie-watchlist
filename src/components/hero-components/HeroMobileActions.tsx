import { FaCirclePlus } from "react-icons/fa6";
import { Movie } from "@/lib/types/types";
import { Button } from "@/components/ui/button";
import WatchTrailerButton from "../WatchTrailerButton";
import AddToListButtonWrapper from "../add-to-list-components/AddToListButtonWrapper";

export default function HeroMobileActions({
  movie,
  userId,
  username,
}: {
  movie: Movie;
  userId: string;
  username: string;
}) {
  return (
    <>
      <div className="mx-[4%] my-[10px] flex items-center gap-2">
        <WatchTrailerButton movieId={movie.id} />

        <AddToListButtonWrapper
          userId={userId}
          movie={movie}
          username={username}
          triggerComponent={
            <Button
              className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-secondary-color px-4 py-2 transition duration-300 ease-in-out hover:bg-secondary-color-dark active:bg-secondary-color-darkest`}
            >
              <FaCirclePlus className="h-[20px] w-[20px] md:h-[25px] md:w-[25px]" />
              <span className="flex items-center text-xs font-medium uppercase md:text-base">
                add to list
              </span>
            </Button>
          }
        />
      </div>
    </>
  );
}
