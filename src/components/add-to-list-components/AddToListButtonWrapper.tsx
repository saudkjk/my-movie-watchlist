"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomListModal from "./CustomListModal";
import CreateListModal from "./CreateListModal";
import { Movie } from "@/lib/types/types";
import { Button } from "../ui/button";

interface AddToListButtonWrapperProps {
  userId: string;
  movie: Movie;
  username: string;
  triggerComponent: React.ReactNode; 
}

export default function AddToListButtonWrapper({
  userId,
  movie,
  username,
  triggerComponent,
}: AddToListButtonWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  const [customLists, setCustomLists] = useState<any[]>([]);

  const handleCreateNewList = (newList: any) => {
    setCustomLists((prevLists) => [...prevLists, newList]);
    setIsCreateListModalOpen(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(isOpen) => setIsModalOpen(isOpen)}
      >
        <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
        <DialogContent className="max-w-[80%] rounded-md bg-[#312F2F] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mb-8">Add to List</DialogTitle>
            <Button
              variant="secondary"
              className="bg-main-color hover:bg-main-color-dark"
              onClick={() => {
                setIsCreateListModalOpen(true);
                setIsModalOpen(false);
              }}
            >
              Create Custom List
            </Button>
          </DialogHeader>

          <CustomListModal userId={userId} movie={movie} />
          <DialogFooter>
            <Button
              variant="secondary"
              className="flex"
              onClick={() => setIsModalOpen(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isCreateListModalOpen}
        onOpenChange={setIsCreateListModalOpen}
      >
        <DialogContent className="max-w-[80%] rounded-md bg-[#312F2F] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Custom List</DialogTitle>
          </DialogHeader>
          <CreateListModal
            userId={userId}
            username={username}
            onCreate={handleCreateNewList}
            onCancel={() => {
              setIsCreateListModalOpen(false);
              setIsModalOpen(true);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
