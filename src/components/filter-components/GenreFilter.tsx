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
import { Button } from "@/components/ui/button";
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
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">
          <div className={"flex items-center"}>
            Genre
            <ChevronDown className="mt-0.5 h-4 w-4 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 w-[500px] p-2">
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
