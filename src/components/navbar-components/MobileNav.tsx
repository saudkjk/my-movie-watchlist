"use server";
import { IoMenuSharp } from "react-icons/io5";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import links from "@/lib/links.json";
import DarkModeSwitch from "../DarkModeSwitch";

export default async function MobileNav({ className }: { className?: string }) {
  return (
    <div className={`flex justify-start ${className}`}>
      <Sheet>
        <SheetTrigger asChild>
          <button aria-label="Open navigation">
            <IoMenuSharp className="text-3xl" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex w-[230px] flex-col gap-2 text-center"
        >
          {links.map((link) => (
            <SheetClose asChild key={link.path}>
              <a
                href={link.path}
                className="h-10 max-w-[90%] items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.name}
              </a>
            </SheetClose>
          ))}
          <DarkModeSwitch />
        </SheetContent>
      </Sheet>
    </div>
  );
}
