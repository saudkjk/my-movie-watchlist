"use server";
import SearchForm from "./SearchForm";
import React from "react";
import Navbar from "./Navbar";

export default async function Header() {
    return (
        <div className='md:mb-5 pt-2'>
            <Navbar></Navbar>

            <div className='flex bg-transparent  flex-col items-center justify-center overflow-hidden rounded-md'>
                <div className='hidden md:flex md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20'>
                    <div className='flex flex-col items-center text-7xl text-stone-950 dark:text-slate-100 pt-3 font-bold'>
                        My Movie
                        <span className='inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500'>
                            Watchlist
                        </span>
                    </div>
                </div>
                <div className='w-[40rem] h-6 relative'>
                    <div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
                    <div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
                    <div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[2px] w-1/4 blur-sm' />
                    <div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
                </div>
            </div>

            <div className='mt-2 '>
                <SearchForm />
            </div>
        </div>
    );
}
