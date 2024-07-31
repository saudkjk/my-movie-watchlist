'use server'
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { clerkClient } from '@clerk/clerk-sdk-node';

export async function addComment(userId: string, targetUserId: string, comment: string, username: string) {
    try {
        await prisma.comments.create({
            data: {
                userId: userId,
                targetUserId: targetUserId,
                comment: comment,
            }
        });
        revalidatePath(`/browse/${username}`);
        return { status: 200, message: "Added comment successfully" };
    } catch (error) {
        console.error('Error adding comment:', error);
        return { status: 500, message: 'Failed to add comment' };
    }
}

export async function removeComment(commentId: string) {
    try {
        await prisma.comments.delete({
            where: {
                id: commentId,
            }
        });
        revalidatePath('/');
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

export async function inWatchlist(userId: string, movieIds: number[]) {
    try {
        const watchlist = await prisma.watchlist.findMany({
            where: {
                userId: userId,
                movieId: {
                    in: movieIds.map(id => String(id))
                }
            }
        });

        const movieIdSet = new Set(watchlist.map(item => Number(item.movieId)));
        return movieIds.map(movieId => movieIdSet.has(movieId));
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        throw error;
    }
}

export async function inCompleted(userId: string, movieIds: number[]) {
    try {
        const completed = await prisma.completed.findMany({
            where: {
                userId: userId,
                movieId: {
                    in: movieIds.map(id => String(id))
                }
            }
        });

        const movieIdSet = new Set(completed.map(item => Number(item.movieId)));
        return movieIds.map(movieId => movieIdSet.has(movieId));
    } catch (error) {
        console.error('Error fetching completed:', error);
        throw error;
    }
}

export async function isLiked(userId: string, movieIds: number[]) {
    try {
        const likedMovies = await prisma.completed.findMany({
            where: {
                userId: userId,
                movieId: {
                    in: movieIds.map(id => String(id))
                },
                rating: "liked"
            }
        });

        const likedMovieIdSet = new Set(likedMovies.map(item => Number(item.movieId)));
        return movieIds.map(movieId => likedMovieIdSet.has(movieId));
    } catch (error) {
        console.error('Error fetching liked movies:', error);
        throw error;
    }
}

export async function updateWithDatabaseStatus(userId: string, movies: any[]) {
    const movieIds = movies.map(movie => movie.id);

    try {
        const [watchlistStatuses, completedStatuses, likedStatuses] = await Promise.all([
            inWatchlist(userId, movieIds),
            inCompleted(userId, movieIds),
            isLiked(userId, movieIds),
        ]);

        return movies.map((movie, index) => ({
            ...movie,
            inWatchlist: watchlistStatuses[index],
            inCompleted: completedStatuses[index],
            isLiked: likedStatuses[index],
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