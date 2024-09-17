import { auth, clerkClient } from "@clerk/nextjs/server";
export async function getUserInfo() {
    const userId = (await auth().userId) || "";
    let username = "";
    if (userId) {
        username = (await clerkClient.users.getUser(userId)).username || "";
    }
    return { userId, username };
}
