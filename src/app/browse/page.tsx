"use server";
import Link from "next/link";
import Image from "next/image";
import { getUsersWithPublicVisibility } from "@/lib/database";
import PageTitle from "@/components/PageTitle";

export default async function Page() {
  const users = (await getUsersWithPublicVisibility()).users;

  return (
    <>
      <PageTitle title="Browse Watchlists" />
      <div className="mt-4 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users &&
          users.map((user) => (
            <Link key={user.username} href={"/browse/" + user.username}>
              <div className="flex items-center gap-4 rounded-lg border bg-white p-4 text-lg font-semibold shadow-sm transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
                <Image
                  src={user.imageUrl}
                  alt={user.username!}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                {user.username}
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
