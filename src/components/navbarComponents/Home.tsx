"use server";
import Link from "next/link";
export default async function NavbarLinks() {
    return (
        <div className='ml-2 mt-1'>
            <Link href='/' className={`hover:text-red-600 font-bold`}>
                <span className='inline-block text-xl lg:text-2xl hover:text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500'>
                    Home
                </span>
            </Link>
        </div>
    );
}
