"use server";
import { MdOutlineMenu } from "react-icons/md";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

const links = [
    { path: "/", name: "Home", },
    { path: "/genre?genre=trending&page=1", name: "Trending", },
    { path: "/genre?genre=toprated&page=1", name: "Top Rated", },
    { path: "/browse", name: "Browse Watchlists", },
    { path: "/watchlist", name: "Watchlist", },
    { path: "/completed", name: "Completed", },
];

export default async function MobileNav() {
    return (
        <div className=' ml-2 flex justify-start mt-1'>
            <Sheet>
                <SheetTrigger asChild>
                    <button>
                        <MdOutlineMenu className=' text-3xl ml-2' />
                    </button>
                </SheetTrigger>
                <SheetContent side='left' className='w-[220px] sm:w-[300px]'>
                    <div className='flex flex-col  text-center sm:text-left gap-1'>
                        {links.map((link) => (
                            <SheetClose asChild key={link.path}>
                                <a
                                    href={link.path}
                                    className={`hover:text-blue-600 font-semibold`}
                                >
                                    {link.name}
                                </a>
                            </SheetClose>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
