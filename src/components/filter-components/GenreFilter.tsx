"use client";
import genres from "@/lib/genres.json";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import React, { useCallback } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

type Genre = {
  id: number;
  name: string;
};

export default function GenreFilter() {
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
    <Popover>
      <PopoverTrigger>
        <div className={"flex items-center gap-1 text-slate-200"}>
          {searchParams.get("genre") ? (
            <div
              className={`flex items-center justify-center gap-2 rounded-full bg-secondary-color px-4 py-2 transition duration-300 ease-in-out hover:bg-secondary-color-dark active:bg-secondary-color-darkest`}
            >
              <span className="flex items-center text-2xl font-medium">
                {searchParams.get("genre")}
              </span>
              <ChevronDown className="mt-1 h-7 w-7" />
            </div>
          ) : (
            <div
              className={`flex items-center justify-center gap-2 rounded-full bg-secondary-color px-4 py-2 transition duration-300 ease-in-out hover:bg-secondary-color-dark active:bg-secondary-color-darkest`}
            >
              <span className="flex items-center text-2xl font-medium">
                Genre
              </span>
              <ChevronDown className="mt-1 h-7 w-7" />
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="z-50 w-[620px] bg-[#312F2F]/95 p-2 md:mx-[8%]">
        <div className="grid grid-cols-5">
          {genres.map((genre: Genre) => (
            <div key={genre.id}>
              <Link
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
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
