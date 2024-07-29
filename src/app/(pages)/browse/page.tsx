"use server";
import Link from "next/link";
import Image from "next/image";
import { getUsersWithPublicVisibility } from '@/lib/database';
import PageTitle from "@/components/PageTitle";

export default async function Page() {

    const users = (await getUsersWithPublicVisibility()).users;

    return (
        <>
            <PageTitle title='Browse Watchlists' />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mt-4'>
                {users && users.map((user) => (
                    <Link key={user.username} href={"/browse/" + user.username}>
                        <div className='block p-4 bg-white dark:bg-gray-800 rounded-lg transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-700'>
                            <div className='flex items-center space-x-4'>
                                <Image
                                    src={user.imageUrl}
                                    alt={user.username!}
                                    width={50}
                                    height={50}
                                    className='rounded-full'
                                />
                                <div className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
                                    {user.username}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
