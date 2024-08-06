"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

export function SelectSortBy() {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[160px]">
          <div className={"flex w-full items-center justify-between"}>
            {searchParams.get("sort") === "vote_average.desc"
              ? "Sort: Rating"
              : "Sort: Popularity"}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 w-[160px] p-2">
        <DropdownMenuItem asChild>
          <Link
            href={pathname + "?" + createQueryString("sort", "popularity.desc")}
            className={navigationMenuTriggerStyle()}
          >
            Popularity
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={
              pathname + "?" + createQueryString("sort", "vote_average.desc")
            }
            className={navigationMenuTriggerStyle()}
          >
            Rating
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
