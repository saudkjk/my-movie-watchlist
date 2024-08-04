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
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className="w-[120px]">
          <div className={"flex w-full items-center justify-between"}>
            Genre
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 p-2">
        <div className="grid grid-cols-2 gap-1">
          {genres.map((genre: Genre) => (
            <div key={genre.id}>
              <Link
                legacyBehavior
                passHref
                href={pathname + "?" + createQueryString("genre", genre.name)}
              >
                <a className={navigationMenuTriggerStyle()}>{genre.name}</a>
              </Link>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
