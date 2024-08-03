"use client";
import { CiFilter } from "react-icons/ci";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "./ui/button";
import { Genre } from "@/lib/types/types";
import Link from "next/link";
import genres from "@/lib/genres.json";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { SelectSort } from "./SelectSort";
import { MobileSelectSort } from "./MobileSelectSort";
import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function GenreFilter({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  if (isDesktop) {
    return (
      <div className={`mt-4 flex justify-start gap-2`}>
        {children}
        <SelectSort />
      </div>
    );
  } else {
    return (
      <div className={`mt-4 flex justify-start ${className}`}>
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-label="Open navigation" className="m-0 p-1 pr-3">
              <CiFilter className="text-3xl" />
              <span>Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex w-[270px] flex-col gap-3 text-left"
          >
            <div className="text-md font-semibold">Filter by: </div>
            <div className="grid grid-cols-2 gap-1">
              {genres.map((genre: Genre) => (
                <Link
                  key={genre.id}
                  legacyBehavior
                  passHref
                  href={pathname + "?" + createQueryString("genre", genre.name)}
                >
                  <a className={navigationMenuTriggerStyle()}>{genre.name}</a>
                </Link>
              ))}
            </div>
            <div className="text-md font-semibold">Sort by: </div>
            <MobileSelectSort />
          </SheetContent>
        </Sheet>
      </div>
    );
  }
}
