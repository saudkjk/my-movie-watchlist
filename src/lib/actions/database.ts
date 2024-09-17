"use server";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { redirect } from "next/navigation";
import { Movie, User } from "@/lib/types/types";
import { z } from "zod";

export async function addComment(
    userId: string,
    listId: string,
    username: string,
    comment: string,
) {
    const commentSchema = z.object({
        comment: z.string().trim().min(1, "Comment cannot be empty"),
    });

    try {
        const validation = commentSchema.safeParse({ comment });

        if (!validation.success) {
            return {
                status: 400,
                message: validation.error.errors.map((err) => err.message).join(", "),
            };
        }

        await prisma.comment.create({
            data: {
                userId: userId,
                listId: listId,
                username: username,
                content: validation.data.comment,
            },
        });

        revalidatePath(`/list/${listId}`);

        return { status: 200, message: "Comment added successfully" };
    } catch (error) {
        console.error("Error adding comment:", error);
        return { status: 500, message: "Failed to add comment" };
    }
}

export async function isListLikedByUser(customListId: string, userId: string) {
    try {
        const like = await prisma.like.findFirst({
            where: {
                listId: customListId,
                userId: userId,
            },
        });

        return like !== null; // Returns true if the user liked the list, otherwise false
    } catch (error) {
        console.error("Error checking if list is liked by user:", error);
        return false; // If there's an error, treat it as not liked
    }
}

export async function removeComment(commentId: string, userId: string) {
    try {
        // First, fetch the comment to ensure it exists and is owned by the user
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
            },
        });

        if (!comment) {
            return { status: 404, message: "Comment not found" };
        }

        if (comment.userId !== userId) {
            return {
                status: 403,
                message: "You are not authorized to delete this comment",
            };
        }

        // If the comment exists and the user is authorized, delete the comment
        await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });

        // Revalidate the path after deletion
        revalidatePath("/");

        return { status: 200, message: "Comment removed successfully" };
    } catch (error) {
        console.error("Error removing comment:", error);
        return { status: 500, message: "Failed to remove comment" };
    }
}

export async function addToCustomList(
    customListId: string,
    userId: string,
    movieId: string,
    moviePoster: string,
) {
    try {
        // Check if the movie already exists in the custom list
        const existingItem = await prisma.customListItem.findFirst({
            where: {
                listId: customListId,
                movieId: movieId,
            },
        });

        if (existingItem) {
            return { status: 400, message: "Movie is already in the custom list" };
        }

        // Check if the custom list belongs to the user
        const customList = await prisma.customList.findFirst({
            where: {
                id: customListId,
                userId: userId,
            },
        });

        if (!customList) {
            return {
                status: 403,
                message: "Custom list not found or does not belong to the user",
            };
        }

        // Add the movie to the custom list
        await prisma.customListItem.create({
            data: {
                listId: customListId,
                movieId: movieId,
                moviePoster: moviePoster,
            },
        });

        return { status: 200, message: "Movie added to custom list successfully" };
    } catch (error) {
        console.error("Error adding movie to custom list:", error);
        return { status: 500, message: "Failed to add movie to custom list" };
    }
}

export async function removeFromCustomList(
    customListId: string,
    userId: string,
    movieId: string,
) {
    try {
        // Check if the custom list belongs to the user
        const customList = await prisma.customList.findFirst({
            where: {
                id: customListId,
                userId: userId,
            },
        });

        if (!customList) {
            return {
                status: 403,
                message: "Custom list not found or does not belong to the user",
            };
        }

        // Remove the movie from the custom list
        const deletedItem = await prisma.customListItem.deleteMany({
            where: {
                listId: customListId,
                movieId: movieId,
            },
        });

        if (deletedItem.count === 0) {
            return { status: 404, message: "Movie not found in the custom list" };
        }

        return {
            status: 200,
            message: "Movie removed from custom list successfully",
        };
    } catch (error) {
        console.error("Error removing movie from custom list:", error);
        return { status: 500, message: "Failed to remove movie from custom list" };
    }
}

export async function addToCompleted(
    userId: string,
    movieId: string,
    rating: string,
) {
    try {
        // Check if the movie is already in the completed list
        const existingItem = await prisma.completedListItem.findFirst({
            where: {
                userId: userId,
                movieId: movieId,
            },
        });

        if (existingItem) {
            return { status: 400, message: "Movie is already in the completed list" };
        }

        // Add the movie to the completed list with a rating
        await prisma.completedListItem.create({
            data: {
                userId: userId,
                movieId: movieId,
                liked: rating === "liked", // If the user gives a positive rating, store `liked` as true
            },
        });

        return {
            status: 200,
            message: "Movie added to completed list successfully",
        };
    } catch (error) {
        console.error("Error adding movie to completed list:", error);
        return { status: 500, message: "Failed to add movie to completed list" };
    }
}

export async function addToCustomlistLikes(
    customListId: string,
    userId: string,
) {
    try {
        const existingItem = await prisma.like.findFirst({
            where: {
                userId: userId,
                listId: customListId,
            },
        });

        if (existingItem) {
            return { status: 400, message: "already liked this list" };
        }

        await prisma.like.create({
            data: {
                userId: userId,
                listId: customListId,
            },
        });

        return { status: 200, message: "liked custom list successfully" };
    } catch (error) {
        console.error("Error liking custom list:", error);
        return { status: 500, message: "Failed to like custom list" };
    }
}

export async function removeFromCustomlistLikes(
    customListId: string,
    userId: string,
) {
    try {
        const existingItem = await prisma.like.findFirst({
            where: {
                userId: userId,
                listId: customListId,
            },
        });

        if (!existingItem) {
            return { status: 400, message: "already not liked this list" };
        }

        await prisma.like.deleteMany({
            where: {
                userId: userId,
                listId: customListId,
            },
        });

        return {
            status: 200,
            message: "removed like from custom list successfully",
        };
    } catch (error) {
        console.error("Error liking custom list:", error);
        return { status: 500, message: "Failed to remove like from custom list" };
    }
}

export async function addToWatchlist(userId: string, movieId: string) {
    try {
        // Check if the movie already exists in the watchlist
        const existingItem = await prisma.watchlistItem.findFirst({
            where: {
                userId: userId,
                movieId: movieId,
            },
        });

        if (existingItem) {
            return { status: 400, message: "Movie is already in the watchlist" };
        }

        // Add the movie to the user's watchlist
        await prisma.watchlistItem.create({
            data: {
                userId: userId,
                movieId: movieId,
            },
        });

        return { status: 200, message: "Movie added to watchlist successfully" };
    } catch (error) {
        console.error("Error adding movie to watchlist:", error);
        return { status: 500, message: "Failed to add movie to watchlist" };
    }
}

export async function removeFromWatchlist(userId: string, movieId: string) {
    try {
        // Remove the movie from the user's watchlist
        const deletedItem = await prisma.watchlistItem.deleteMany({
            where: {
                userId: userId,
                movieId: movieId,
            },
        });

        if (deletedItem.count === 0) {
            return { status: 404, message: "Movie not found in the watchlist" };
        }

        return {
            status: 200,
            message: "Movie removed from the watchlist successfully",
        };
    } catch (error) {
        console.error("Error removing movie from watchlist:", error);
        return { status: 500, message: "Failed to remove movie from watchlist" };
    }
}

export async function removeFromCompleted(userId: string, movieId: string) {
    try {
        // Remove the movie from the user's completed list
        const deletedItem = await prisma.completedListItem.deleteMany({
            where: {
                userId: userId,
                movieId: movieId,
            },
        });

        if (deletedItem.count === 0) {
            return { status: 404, message: "Movie not found in the completed list" };
        }

        return {
            status: 200,
            message: "Movie removed from the completed list successfully",
        };
    } catch (error) {
        console.error("Error removing movie from completed list:", error);
        return {
            status: 500,
            message: "Failed to remove movie from completed list",
        };
    }
}

export async function createNewCustomList(
    userId: string,
    listName: string,
    listDescription: string,
    isPublic: boolean,
    username: string,
) {
    try {
        // Create the new custom list with the provided visibility (public or private)
        const newCustomList = await prisma.customList.create({
            data: {
                userId: userId,
                name: listName,
                description: listDescription,
                isPublic: isPublic,
                username: username,
            },
        });

        return {
            status: 200,
            message: "Custom list created successfully",
            customListId: newCustomList.id,
        };
    } catch (error) {
        console.error("Error creating new custom list:", error);
        return { status: 500, message: "Failed to create custom list" };
    }
}

async function fetchStatuses(userId: string, movieIds: number[]) {
    const [watchlist, completed, liked, customLists] = await Promise.all([
        prisma.watchlistItem.findMany({
            where: { userId, movieId: { in: movieIds.map(String) } },
            select: { movieId: true },
        }),
        prisma.completedListItem.findMany({
            where: { userId, movieId: { in: movieIds.map(String) } },
            select: { movieId: true },
        }),
        prisma.completedListItem.findMany({
            where: { userId, movieId: { in: movieIds.map(String) }, liked: true },
            select: { movieId: true },
        }),
        prisma.customListItem.findMany({
            where: {
                movieId: { in: movieIds.map(String) },
                list: { userId }, // Filter by user ID to get only the lists of this user
            },
            select: {
                movieId: true,
                list: {
                    select: { name: true },
                },
            },
        }),
    ]);

    const watchlistSet = new Set(watchlist.map((item) => item.movieId));
    const completedSet = new Set(completed.map((item) => item.movieId));
    const likedSet = new Set(liked.map((item) => item.movieId));

    // Create a mapping of movieId to the custom list names they belong to
    const customListMap: Record<string, string[]> = {};
    customLists.forEach((item) => {
        if (!customListMap[item.movieId]) {
            customListMap[item.movieId] = [];
        }
        customListMap[item.movieId].push(item.list.name);
    });

    return { watchlistSet, completedSet, likedSet, customListMap };
}

export async function updateWithDbStatus(userId: string, movies: any[]) {
    // Filter out any movies that are undefined or don't have an id
    const validMovies = movies.filter((movie) => movie && movie.id);

    // Extract the ids of the valid movies
    const movieIds = validMovies.map((movie) => movie.id);

    try {
        const { watchlistSet, completedSet, likedSet, customListMap } =
            await fetchStatuses(userId, movieIds);

        // Return the movies with the additional status properties, including inCustomLists
        return movies.map((movie) => {
            if (movie && movie.id) {
                return {
                    ...movie,
                    inWatchlist: watchlistSet.has(String(movie.id)),
                    inCompleted: completedSet.has(String(movie.id)),
                    isLiked: likedSet.has(String(movie.id)),
                    inCustomLists: customListMap[movie.id] || [], // Add custom list names
                };
            } else {
                // Return the movie as is if it's invalid
                return movie;
            }
        });
    } catch (error) {
        console.error("Error checking database status:", error);
        throw error;
    }
}

export async function getCustomListVisibility(
    userId: string,
    customListId: string,
) {
    try {
        // First, check if the custom list belongs to the user
        const customList = await prisma.customList.findFirst({
            where: {
                id: customListId,
                userId: userId,
            },
            select: {
                isPublic: true, // Only fetch the visibility status
            },
        });

        // If the list is not found or doesn't belong to the user
        if (!customList) {
            return {
                status: 404,
                message: "Custom list not found or does not belong to the user",
            };
        }

        // Return the current visibility status of the custom list
        return {
            status: 200,
            message: "Custom list visibility retrieved successfully",
            isPublic: customList.isPublic,
        };
    } catch (error) {
        console.error("Error retrieving custom list visibility:", error);
        return {
            status: 500,
            message: "Failed to retrieve custom list visibility",
        };
    }
}

export async function toggleCustomListVisibility(
    userId: string,
    customListId: string,
) {
    try {
        // First, check if the custom list belongs to the user
        const customList = await prisma.customList.findFirst({
            where: {
                id: customListId,
                userId: userId,
            },
        });

        // If the list is not found or doesn't belong to the user
        if (!customList) {
            return {
                status: 404,
                message: "Custom list not found or does not belong to the user",
            };
        }

        // Toggle the visibility of the custom list
        const updatedList = await prisma.customList.update({
            where: {
                id: customListId,
            },
            data: {
                isPublic: !customList.isPublic, // Toggle the visibility
            },
        });

        return {
            status: 200,
            message: "Custom list visibility toggled successfully",
            updatedList,
        };
    } catch (error) {
        console.error("Error toggling custom list visibility:", error);
        return { status: 500, message: "Failed to toggle custom list visibility" };
    }
}

// export async function changeVisibility(userId: string) {
//     try {
//         // get current visibility
//         let userSettings = await prisma.userSettings.findUnique({
//             where: { userId: userId },
//             select: { watchlistVisibility: true }
//         });

//         if (!userSettings) {
//             // Create a new user settings entry with default visibility
//             userSettings = await prisma.userSettings.create({
//                 data: {
//                     userId: userId,
//                     watchlistVisibility: "private"
//                 },
//                 select: { watchlistVisibility: true }
//             });
//         }

//         const newVisibility = userSettings.watchlistVisibility === "public" ? "private" : "public";

//         // Update visibility
//         await prisma.userSettings.update({
//             where: { userId: userId },
//             data: { watchlistVisibility: newVisibility }
//         });
//         revalidatePath('/');
//         return { status: 200, message: "Visibility updated successfully", newVisibility: newVisibility };
//     } catch (error) {
//         console.error('Error updating visibility:', error);
//         return { status: 500, message: 'Failed to update visibility' };
//     }
// }

// export async function getVisibility(userId: string) {
//     try {
//         let userSettings = await prisma.userSettings.findFirst({
//             where: { userId: userId },
//             select: { watchlistVisibility: true }
//         });

//         if (!userSettings) {
//             // Create a new user settings entry with default visibility
//             userSettings = await prisma.userSettings.create({
//                 data: {
//                     userId: userId,
//                     watchlistVisibility: "private"
//                 },
//                 select: { watchlistVisibility: true }
//             });
//         }

//         const isPublic = userSettings.watchlistVisibility === "public";
//         return { status: 200, isPublic: isPublic };
//     } catch (error) {
//         console.error('Error retrieving visibility:', error);
//         return { status: 500, message: 'Failed to retrieve visibility', isPublic: false };
//     }
// }

export async function getAllCustomLists() {
    try {
        // Fetch all custom lists where isPublic is true
        const customLists = await prisma.customList.findMany({
            include: {
                listItems: true, // Include related list items
                likes: true, // Include related likes
                comments: true, // Include related comments
            },
        });

        return customLists;
    } catch (error) {
        console.error("Error fetching public custom lists:", error);
        throw error;
    }
}

export async function getAllPublicCustomLists() {
    try {
        // Fetch all custom lists where isPublic is true
        const publicCustomLists = await prisma.customList.findMany({
            where: {
                isPublic: true,
            },
            include: {
                listItems: true, // Include related list items
                likes: true, // Include related likes
                comments: true, // Include related comments
            },
        });

        return publicCustomLists;
    } catch (error) {
        console.error("Error fetching public custom lists:", error);
        throw error;
    }
}

export async function getPublicUserCustomLists(userId: string) {
    try {
        // Query the database to get all public custom lists for the given user
        const customLists = await prisma.customList.findMany({
            where: {
                userId: userId,
                isPublic: true, // Only fetch public custom lists
            },
            include: {
                listItems: true, // Optionally include the list items for each custom list
                likes: true, // Optionally include the likes for each custom list
                comments: true, // Optionally include the comments for each custom list
            },
        });

        // If no custom lists are found, return an empty array
        if (customLists.length === 0) {
            return {
                status: 404,
                message: "No public custom lists found",
                customLists: [],
            };
        }

        return {
            status: 200,
            message: "Public custom lists retrieved successfully",
            customLists,
        };
    } catch (error) {
        console.error("Error retrieving public custom lists:", error);
        return { status: 500, message: "Failed to retrieve public custom lists" };
    }
}

export async function getWatchlistMovies(userId: string) {
    try {
        // Query to find all movies from the user's watchlist
        const watchlistMovies = await prisma.watchlistItem.findMany({
            where: {
                userId: userId,
            },
            select: {
                movieId: true, // Only return the movieId
            },
        });

        // If no watchlist movies are found, return an empty array
        if (watchlistMovies.length === 0) {
            return {
                status: 404,
                message: "No watchlist movies found",
                movieIds: [],
            };
        }

        // Extract movie IDs from the watchlistItem array
        const movieIds = watchlistMovies.map((item) => item.movieId);

        return {
            status: 200,
            message: "Watchlist movies retrieved successfully",
            movieIds,
        };
    } catch (error) {
        console.error("Error retrieving watchlist movies:", error);
        return {
            status: 500,
            message: "Failed to retrieve watchlist movies",
            movieIds: [],
        };
    }
}

export async function getCompletedListMovies(userId: string) {
    try {
        // Query to find all movies from the user's completed list
        const completedMovies = await prisma.completedListItem.findMany({
            where: {
                userId: userId,
            },
            select: {
                movieId: true, // Only return the movieId
            },
        });

        // If no completed movies are found, return an empty array
        if (completedMovies.length === 0) {
            return {
                status: 404,
                message: "No completed movies found",
                movieIds: [],
            };
        }

        // Extract movie IDs from the completedListItem array
        const movieIds = completedMovies.map((item) => item.movieId);

        return {
            status: 200,
            message: "Completed movies retrieved successfully",
            movieIds,
        };
    } catch (error) {
        console.error("Error retrieving completed movies:", error);
        return {
            status: 500,
            message: "Failed to retrieve completed movies",
            movieIds: [],
        };
    }
}

export async function getMoviesFromCustomList(customListId: string) {
    try {
        // Query to find the custom list by customListId and ownerId (to ensure the list belongs to the user)
        const customList = await prisma.customList.findFirst({
            where: {
                id: customListId,
            },
            include: {
                listItems: {
                    select: {
                        movieId: true, // Only return the movieId
                    },
                },
            },
        });

        // If no list is found or it's empty, return an empty array
        if (!customList) {
            return {
                status: 404,
                message: "Custom list not found or does not belong to the user",
                movieIds: [],
            };
        }

        // Extract movie IDs from the listItems array
        const movieIds = customList.listItems.map((item) => item.movieId);

        return {
            status: 200,
            message: "Movie IDs retrieved successfully",
            movieIds,
        };
    } catch (error) {
        console.error("Error retrieving movie IDs from custom list:", error);
        return {
            status: 500,
            message: "Failed to retrieve movie IDs",
            movieIds: [],
        };
    }
}

export async function getUserCustomLists(userId: string) {
    try {
        // Query the database to get all custom lists for the given user
        const customLists = await prisma.customList.findMany({
            where: {
                userId: userId,
            },
            include: {
                listItems: true,
                likes: true, // Optionally include the likes for each custom list
                comments: true, // Optionally include the comments for each custom list
            },
        });

        // If no custom lists are found, return an empty array
        if (!customLists) {
            return { status: 404, message: "No custom lists found", customLists: [] };
        }

        return {
            status: 200,
            message: "Custom lists retrieved successfully",
            customLists,
        };
    } catch (error) {
        console.error("Error retrieving custom lists:", error);
        return { status: 500, message: "Failed to retrieve custom lists" };
    }
}

export async function getCustomListOwner(listId: string) {
    try {
        // Query the database to get the owner of the custom list by listId
        const customList = await prisma.customList.findUnique({
            where: {
                id: listId,
            },
            select: {
                userId: true, // Retrieve the owner (userId) of the list
                name: true, // Optionally include the list name or other details
            },
        });

        if (!customList) {
            return { status: 404, message: "Custom list not found", owner: null };
        }

        return {
            status: 200,
            message: "Custom list retrieved successfully",
            owner: customList.userId,
            listName: customList.name,
        };
    } catch (error) {
        console.error("Error retrieving custom list owner:", error);
        return {
            status: 500,
            message: "Failed to retrieve custom list owner",
            owner: null,
        };
    }
}

export async function getCustomListDetails(listId: string) {
    try {
        // Query the database to get all details of the custom list by listId
        const customList = await prisma.customList.findUnique({
            where: {
                id: listId,
            },
            include: {
                listItems: true, // Retrieve related list items
                likes: true, // Retrieve related likes
                comments: true, // Retrieve related comments
            },
        });

        if (!customList) {
            return {
                status: 404,
                message: "Custom list not found",
                customList: null,
            };
        }

        return {
            status: 200,
            message: "Custom list retrieved successfully",
            customList,
        };
    } catch (error) {
        console.error("Error retrieving custom list details:", error);
        return {
            status: 500,
            message: "Failed to retrieve custom list details",
            customList: null,
        };
    }
}

export async function getUserDetails(username: string, usersList: User[]) {
    const user = usersList.find((user) => user.username === username);

    if (!user) {
        redirect("/browse");
    }

    return {
        id: user.id,
        imageUrl: user.imageUrl,
    };
}
