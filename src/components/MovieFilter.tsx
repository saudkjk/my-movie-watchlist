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
import CurrentFilters from "@/components/filter-components/CurrentFilters";

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
      const params = new URLSearchParams(searchParams.toString());
      const existingValues = params.get(name)?.split(",") || [];
      if (!existingValues.includes(value)) {
        existingValues.push(value);
      }
      params.set(name, existingValues.join(","));
      return params.toString();
    },
    [searchParams],
  );

  if (isDesktop) {
    return (
      <div className={`container mt-4 flex justify-between gap-2`}>
        <div className="flex gap-2">
          {children}
          <CurrentFilters />
        </div>
        <SelectSortBy />
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
            <div className="text-md font-semibold">Sort by: </div>
            <div>
              <SelectSortBy />
            </div>
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
            <div className="text-md font-semibold">Current Filters:</div>
            <div className="max-w-[300px] overflow-auto">
              <CurrentFilters />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }
}
