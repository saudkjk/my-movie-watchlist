"use server";
import Link from "next/link";
export default async function Logo() {
    return (
        <Link href='/'>
            <div className=' mx-auto'>
                <div className='flex flex-col items-center text-1xl text-stone-950 dark:text-slate-100 pt-1 font-bold'>
                    My Movie
                    <span className='inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500'>
                        Watchlist
                    </span>
                </div>
            </div>
        </Link>
    );
}
