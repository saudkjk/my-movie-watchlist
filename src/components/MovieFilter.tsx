"use client";
import { CiFilter } from "react-icons/ci";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Genre } from "@/lib/types/types";
import Link from "next/link";
import genres from "@/lib/genres.json";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { SelectSortBy } from "@/components/filter-components/SelectSortBy";
import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ResetFilters from "./filter-components/ResetFilters";

export default function MovieFilter({
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
      const params = new URLSearchParams(searchParams);
      const existingValues = params.get(name)?.split(",") || [];
      if (!existingValues.includes(value)) {
        existingValues.push(value);
      } else {
        existingValues.splice(existingValues.indexOf(value), 1);
      }
      if (existingValues.length > 0) {
        params.set(name, existingValues.join(","));
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  if (isDesktop) {
    return (
      <div className={`mb-4 mt-8 flex justify-between`}>
        <div className="flex gap-2">
          {children}
          {searchParams.size > 0 && <ResetFilters />}
        </div>
        <SelectSortBy />
      </div>
    );
  } else {
    return (
      <div className={`mb-4 mt-4 flex justify-start gap-1 ${className}`}>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              aria-label="Open navigation"
              className="h-9 p-1 px-3 pr-3"
            >
              <CiFilter className="text-3xl" />
              <span>Filters</span>
            </Button>
          </SheetTrigger>
          {searchParams.size > 0 && <ResetFilters />}
          <SheetContent
            side="left"
            className="flex w-[270px] flex-col gap-3 text-left"
          >
            <SelectSortBy />

            <div className="text-md font-semibold">Filter by: </div>
            <div className="grid grid-cols-2 gap-1">
              {genres.map((genre: Genre) => (
                <Link
                  key={genre.id}
                  legacyBehavior
                  passHref
                  href={pathname + "?" + createQueryString("genre", genre.name)}
                >
                  <a className={navigationMenuTriggerStyle()}>
                    {genre.name}
                    {searchParams.get("genre")?.includes(genre.name) && (
                      <span className="ml-1 text-red-500">x</span>
                    )}
                  </a>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }
}
