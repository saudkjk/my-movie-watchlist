"use client";
import { CiFilter } from "react-icons/ci";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Genre } from "@/lib/types/types";
import Link from "next/link";
import genres from "@/lib/genres.json";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { SelectSortBy } from "@/components/filter-components/SelectSortBy";
import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ResetFilters from "./ResetFilters";

export default function MovieFilter({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentValue = params.get(name);

      if (currentValue === value) {
        // If the selected genre already exists, remove it
        params.delete(name);
      } else {
        // Otherwise, set the new genre (replacing any existing value)
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  return (
    <>
      <div className={`mb-4 mt-8 hidden items-end justify-between md:flex`}>
        <div className="flex items-center gap-2">
          {children}
          {searchParams.size > 0 && <ResetFilters />}
        </div>
        <SelectSortBy />
      </div>
      <div
        className={`mb-4 mt-4 flex justify-between gap-1 md:hidden ${className}`}
      >
        {searchParams.get("genre") ? (
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center gap-2 rounded-full transition duration-300 ease-in-out`}
            >
              <span className="flex items-center text-xl font-medium">
                <div className="flex">{searchParams.get("genre")} Movies:</div>
              </span>
            </div>
          </div>
        ) : (
          <div> </div>
        )}
        <div className="flex gap-4">
          {searchParams.size > 0 && <ResetFilters />}
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open navigation"
                className="flex h-9 items-center gap-1 rounded-full bg-secondary-color p-1 px-3 pr-3 text-slate-200 hover:bg-secondary-color-dark active:bg-secondary-color-darkest"
              >
                <CiFilter className="text-3xl" />
                <span className="text-lg">Filters</span>
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-[270px] flex-col gap-3 border-[#312F2F] bg-[#312F2F] text-left"
            >
              <div className="text-md font-semibold">Filter by: </div>
              <div className="grid grid-cols-2 gap-1">
                {genres.map((genre: Genre) => (
                  <Link
                    key={genre.id}
                    legacyBehavior
                    passHref
                    href={
                      pathname + "?" + createQueryString("genre", genre.name)
                    }
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
              <SelectSortBy />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
