import { getAllPublicCustomLists } from "@/lib/actions/database";
import MovieListCard from "@/components/movie-card-components/MovieListCard";

export default async function Page() {
  const publicLists = await getAllPublicCustomLists();
  return (
    <div className="mx-[4%] mb-[15px] md:mx-[8%]">
      <h2 className="mb-[20px] text-2xl font-semibold">Browse Lists</h2>
      <div className="grid grid-cols-1 gap-x-[50px] gap-y-[50px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {publicLists &&
          publicLists.map(
            (list) =>
              list.listItems.length >= 3 && (
                <MovieListCard key={list.id} movieList={list} />
              ),
          )}
      </div>
    </div>
  );
}
