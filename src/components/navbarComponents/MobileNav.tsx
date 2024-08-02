"use server";
import { MdOutlineMenu } from "react-icons/md";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import links from "@/lib/links.json";

export default async function MobileNav({ className }: { className?: string }) {
  return (
    <div className={`ml-2 mt-1 flex justify-start ${className}`}>
      <Sheet>
        <SheetTrigger asChild>
          <button aria-label="Open navigation">
            <MdOutlineMenu className="ml-2 text-3xl" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex w-[220px] flex-col gap-3 text-center sm:w-[300px] sm:gap-1 sm:text-left"
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
