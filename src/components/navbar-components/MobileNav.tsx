import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import links from "@/lib/links.json";

import AuthButtons from "./AuthButtons";

export default async function MobileNav({ className }: { className?: string }) {
  return (
    <div className={`flex h-12 justify-start ${className}`}>
      <Sheet>
        <SheetTrigger asChild>
          <button aria-label="Open navigation">
            <img
              loading="lazy"
              src={`https://cdn.builder.io/api/v1/image/assets/TEMP/c978a17026e05e5d67d00e99efc056308202b42f22b31eea4597114395051c6b?placeholderIfAbsent=true&apiKey=${process.env.NEXT_PUBLIC_IMAGE_KEY}`}
              alt="Menu icon"
              className="h-auto w-[30px] object-contain"
            />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-[230px] flex-col gap-2 border-[#312F2F] bg-[#312F2F] text-center"
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
          <div className="max-w-[90%]">
            <AuthButtons />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
