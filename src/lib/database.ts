'use server'
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { redirect } from 'next/navigation';
import { User } from '@/types/types';
import { z } from "zod";



export async function addComment(
    userId: string,
    targetUserId: string,
    previousState: any,
    formData: FormData,
) {
    const commentSchema = z.object({
        comment: z.string().min(1, "Comment cannot be empty"),
    });


    try {

        const comment = formData.get("comment");
        const validation = commentSchema.safeParse({ comment });

        if (!validation.success) {
            return { status: 400, message: validation.error.errors.map(err => err.message).join(", ") };
        }

        await prisma.comments.create({
            data: {
                userId: userId,
                targetUserId: targetUserId,
                comment: validation.data.comment,
            },
        });

        revalidatePath("/");
    } catch (error) {
        console.error("Error adding comment:", error);
        return { status: 500, message: "Failed to add comment" };
    }
}

export async function removeComment(commentId: string) {
    try {
        await prisma.comments.delete({
            where: {
                id: commentId,
            }
        });
        return { status: 200, message: "Removed comment successfully" };
    } catch (error) {
        console.error('Error removing comment:', error);
        return { status: 500, message: 'Failed to remove comment' };
    }
}

export async function getUserWatchlistComments(targetUserId: string) {
    try {
        const comments = await prisma.comments.findMany({
            where: {
                targetUserId: targetUserId,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
        return { status: 200, data: comments, message: "Fetched comments successfully" };
    } catch (error) {
        console.error('Error fetching comments:', error);
        return { status: 500, message: 'Failed to fetch comments' };
    }
}

export async function addToWatchlist(userId: string, movieId: string) {
    try {
        await prisma.watchlist.create({
            data: {
                movieId: String(movieId),
                userId: userId
            }
        });
        return { status: 200, message: "Added to watchlist successfully" };
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        return { status: 500, message: 'Failed to add to list' };
    }
}

export async function addToCompleted(userId: string, movieId: string, rating: string) {
    try {
        await prisma.completed.create({
            data: {
                movieId: String(movieId),
                userId: userId,
                rating: rating
            }
        });
        return { status: 200, message: "Added to completed successfully" };
    } catch (error) {
        console.error('Error adding to completed:', error);
        return { status: 500, message: 'Failed to add to list' };
    }
}


export async function removeFromWatchlist(userId: string, movieId: string) {
    try {
        await prisma.watchlist.deleteMany({
            where: {
                movieId: String(movieId),
                userId: userId
            }
        });
        return { status: 200, message: "Removed from watchlist successfully" };
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        return { status: 500, message: 'Failed to remove from list' };
    }
}

export async function removeFromCompleted(userId: string, movieId: string) {
    try {
        await prisma.completed.deleteMany({
            where: {
                movieId: String(movieId),
                userId: userId
            }
        });
        return { status: 200, message: "Removed from completed successfully" };
    } catch (error) {
        console.error('Error removing from completed:', error);
        return { status: 500, message: 'Failed to remove from list' };
    }
}

async function fetchStatuses(userId: string, movieIds: number[]) {
    const [watchlist, completed, liked] = await Promise.all([
        prisma.watchlist.findMany({
            where: { userId, movieId: { in: movieIds.map(String) } },
            select: { movieId: true }
        }),
        prisma.completed.findMany({
            where: { userId, movieId: { in: movieIds.map(String) } },
            select: { movieId: true }
        }),
        prisma.completed.findMany({
            where: { userId, movieId: { in: movieIds.map(String) }, rating: 'liked' },
            select: { movieId: true }
        })
    ]);

    const watchlistSet = new Set(watchlist.map(item => Number(item.movieId)));
    const completedSet = new Set(completed.map(item => Number(item.movieId)));
    const likedSet = new Set(liked.map(item => Number(item.movieId)));

    return { watchlistSet, completedSet, likedSet };
}

export async function updateWithDbStatus(userId: string, movies: any[]) {
    const movieIds = movies.map(movie => movie.id);

    try {
        const { watchlistSet, completedSet, likedSet } = await fetchStatuses(userId, movieIds);

        return movies.map(movie => ({
            ...movie,
            inWatchlist: watchlistSet.has(movie.id),
            inCompleted: completedSet.has(movie.id),
            isLiked: likedSet.has(movie.id),
        }));
    } catch (error) {
        console.error('Error checking database status:', error);
        throw error;
    }
}

export async function changeVisibility(userId: string) {
    try {
        // get current visibility
        let userSettings = await prisma.userSettings.findUnique({
            where: { userId: userId },
            select: { watchlistVisibility: true }
        });

        if (!userSettings) {
            // Create a new user settings entry with default visibility
            userSettings = await prisma.userSettings.create({
                data: {
                    userId: userId,
                    watchlistVisibility: "private"
                },
                select: { watchlistVisibility: true }
            });
        }

        const newVisibility = userSettings.watchlistVisibility === "public" ? "private" : "public";

        // Update visibility
        await prisma.userSettings.update({
            where: { userId: userId },
            data: { watchlistVisibility: newVisibility }
        });
        return { status: 200, message: "Visibility updated successfully", newVisibility: newVisibility };
    } catch (error) {
        console.error('Error updating visibility:', error);
        return { status: 500, message: 'Failed to update visibility' };
    }
}

export async function getVisibility(userId: string) {
    try {
        let userSettings = await prisma.userSettings.findFirst({
            where: { userId: userId },
            select: { watchlistVisibility: true }
        });

        if (!userSettings) {
            // Create a new user settings entry with default visibility
            userSettings = await prisma.userSettings.create({
                data: {
                    userId: userId,
                    watchlistVisibility: "private"
                },
                select: { watchlistVisibility: true }
            });
        }

        const isPublic = userSettings.watchlistVisibility === "public";
        return { status: 200, isPublic: isPublic };
    } catch (error) {
        console.error('Error retrieving visibility:', error);
        return { status: 500, message: 'Failed to retrieve visibility', isPublic: false };
    }
}


export async function getUsersWithPublicVisibility() {
    try {
        // Fetch user IDs with public visibility from UserSettings
        const publicUsers = await prisma.userSettings.findMany({
            where: {
                watchlistVisibility: 'public'
            },
            select: {
                userId: true
            }
        });

        // Extract user Ids
        const publicUserIds = publicUsers.map(user => user.userId);

        // Fetch all users from clerkClient
        const usersList = await clerkClient.users.getUserList();

        // Filter users based on publicUserIds
        const users = usersList.data.filter(user => publicUserIds.includes(user.id)).map(user => ({
            username: user.username,
            imageUrl: user.imageUrl,
        }));

        return { status: 200, users: users };
    } catch (error) {
        console.error('Error retrieving users with public visibility:', error);
        return { status: 500, message: 'Failed to retrieve users' };
    }
}

export async function getCompletedMoviesIds(userId: string) {
    try {
        const completedMoviesIds = await prisma.completed.findMany({
            where: {
                userId,
            },
            select: { movieId: true },
        });
        return completedMoviesIds;
    } catch (error) {
        console.error("Error fetching completed movies IDs:", error);
        throw new Error("Failed to fetch completed movies IDs");
    }
}

export async function getWatchlistMoviesIds(userId: string) {
    try {
        const watchlistMoviesIds = await prisma.watchlist.findMany({
            where: {
                userId,
            },
            select: { movieId: true },
        });
        return watchlistMoviesIds;
    } catch (error) {
        console.error("Error fetching watchlist movies IDs:", error);
        throw new Error("Failed to fetch watchlist movies IDs");
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