import { Key, useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  addToCustomList,
  removeFromCustomList,
  getUserCustomLists,
} from "@/lib/actions/database";
import { Movie } from "@/lib/types/types";

interface CustomListModalProps {
  userId: string;
  movie: Movie;
}

export default function CustomListModal({
  userId,
  movie,
}: CustomListModalProps) {
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const [customLists, setCustomLists] = useState<any[]>([]);

  // Fetch custom lists when the component mounts
  useEffect(() => {
    const fetchCustomLists = async () => {
      const { customLists } = await getUserCustomLists(userId);
      setCustomLists(customLists || []);
    };
    fetchCustomLists();
  }, [userId]);

  
  useEffect(() => {
    if (customLists && movie.inCustomLists) {
      const listIdsForMovie = customLists
        .filter((list: { name: string }) =>
          movie.inCustomLists.includes(list.name),
        )
        .map((list: { id: string }) => list.id);
      setSelectedListIds(listIdsForMovie);
    }
  }, [customLists, movie]);

  const toggleListSelection = async (listId: string) => {
    if (selectedListIds.includes(listId)) {
      await removeFromCustomList(listId, userId, String(movie.id));
      setSelectedListIds((prev) => prev.filter((id) => id !== listId));
    } else {
      await addToCustomList(
        listId,
        userId,
        String(movie.id),
        movie.poster_path!,
      );
      setSelectedListIds((prev) => [...prev, listId]);
    }
  };

  return (
    <div className="grid gap-3 py-4">
      {customLists.length > 0 ? (
        customLists.map(
          (list: { id: Key | null | undefined; name: string }) => (
            <div
              key={list.id}
              className="hover:bg-secondary-color flex w-full cursor-pointer items-center justify-between rounded-md border bg-transparent px-4 py-2 text-white transition duration-300 ease-in-out"
              onClick={() => toggleListSelection(String(list.id))}
            >
              <span>{list.name}</span>
              <Checkbox
                checked={selectedListIds.includes(String(list.id))}
                onCheckedChange={() => toggleListSelection(String(list.id))}
              />
            </div>
          ),
        )
      ) : (
        <p className="text-sm text-gray-500">You have no custom lists.</p>
      )}
    </div>
  );
}
