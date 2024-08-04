"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import Link from "next/link";

export function SelectSortBy() {
  const params = useSearchParams();
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

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className="w-[120px]">
          <div className={"flex w-full items-center justify-between"}>
            {params.get("sortBy")
              ? params.get("sortBy") === "popularity.desc"
                ? "Popularity"
                : "Rating"
              : "Sort By"}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 p-2">
        <div className="flex gap-2">
          <Link
            href={
              pathname + "?" + createQueryString("sortBy", "popularity.desc")
            }
            className={navigationMenuTriggerStyle()}
          >
            Popularity
          </Link>
          <Link
            href={
              pathname + "?" + createQueryString("sortBy", "vote_average.desc")
            }
            className={navigationMenuTriggerStyle()}
          >
            Rating
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
