"use server";
import { MdOutlineMenu } from "react-icons/md";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { path: "/", name: "Home" },
  { path: "/genre?genre=trending&page=1", name: "Trending" },
  { path: "/genre?genre=toprated&page=1", name: "Top Rated" },
  { path: "/browse", name: "Browse Watchlists" },
  { path: "/watchlist", name: "Watchlist" },
  { path: "/completed", name: "Completed" },
];

export default async function MobileNav({ className }: { className?: string }) {
  return (
    <div className={`ml-2 mt-1 flex justify-start ${className}`}>
      <Sheet>
        <SheetTrigger asChild>
          <button>
            <MdOutlineMenu className="ml-2 text-3xl" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex w-[220px] flex-col gap-1 text-center sm:w-[300px] sm:text-left"
        >
          {links.map((link) => (
            <SheetClose asChild key={link.path}>
              <a
                href={link.path}
                className={`font-semibold hover:text-blue-600`}
              >
                {link.name}
              </a>
            </SheetClose>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
}
