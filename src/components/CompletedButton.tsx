"use client";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { addToCompleted, removeFromCompleted } from "@/lib/database";
import { useState } from "react";

type CompletedButtonProps = {
    userId: string;
    movie: any;
}

export function CompletedButton({ userId, movie }: CompletedButtonProps) {
    const { isSignedIn } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    const [inCompleted, setInCompleted] = useState(movie.inCompleted);
    const [isLiked, setIsLiked] = useState(movie.isLiked);

    const handleToggleCompleted = async (action: string, rating: string = "") => {
        if (!isSignedIn) {
            router.push("/sign-in");
        } else {
            setInCompleted(!inCompleted);

            if (action === "add")
                setIsLiked(rating === "liked");

            try {
                if (action === "add") {
                    await addToCompleted(userId, movie.id, rating);
                } else {
                    await removeFromCompleted(userId, movie.id);
                    if (pathname === "/completed") router.refresh();
                }
            } catch (error) {
                console.error(
                    `Failed to ${action === "add" ? "add to" : "remove from"
                    } Completed list`,
                    error
                );
                setInCompleted(!inCompleted);
            }
        }
    };

    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <div
                    className={`inline-block ${inCompleted ? "cursor-pointer" : ""
                        }`}
                    onClick={
                        inCompleted
                            ? () => handleToggleCompleted("remove")
                            : undefined
                    }
                >
                    {inCompleted ? (
                        <div className=''>
                            {isLiked ? (
                                <BsHandThumbsUp className='text-green-500 text-3xl' />
                            ) : (
                                <BsHandThumbsDown className='text-red-500 text-3xl' />
                            )}
                        </div>
                    ) : (
                        <BsHandThumbsUp className='text-white text-3xl' />
                    )}
                </div>
            </TooltipTrigger>
            <TooltipContent
                className={`transform translate-x-${inCompleted ? "9" : "0"}`}
            >
                {!inCompleted ? (
                    <div className='flex  cursor-pointer '>
                        <BsHandThumbsUp
                            onClick={() =>
                                handleToggleCompleted("add", "liked")
                            }
                            className='text-black dark:text-white text-3xl'
                        />
                        <BsHandThumbsDown
                            onClick={() =>
                                handleToggleCompleted("add", "disliked")
                            }
                            className='text-black dark:text-white text-3xl'
                        />
                    </div>
                ) : (
                    <p>Remove from completed</p>
                )}
            </TooltipContent>
        </Tooltip>
    );
};
