"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
      <DropdownMenuTrigger asChild className="w-full">
        <div
          className={
            "flex w-full cursor-pointer items-center justify-between md:w-[160px]"
          }
        >
          {searchParams.get("sort") === "vote_average.desc" ? (
            <div
              className={`mx-2 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 transition duration-300 ease-in-out hover:bg-white hover:text-gray-900 md:mx-0 md:w-[160px] md:bg-main-color md:hover:bg-main-color-dark md:active:bg-main-color-darkest`}
            >
              <span className="flex items-center text-base font-medium">
                Rating
              </span>
              <ChevronDown className="mt-0.5 h-5 w-5" />
            </div>
          ) : (
            <div
              className={`mx-2 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 transition duration-300 ease-in-out hover:bg-white hover:text-gray-900 md:mx-0 md:w-[160px] md:bg-main-color md:hover:bg-main-color-dark md:active:bg-main-color-darkest`}
            >
              <span className="flex items-center text-base font-medium">
                Popularity
              </span>
              <ChevronDown className="mt-0.5 h-5 w-5" />
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 w-full bg-[#312F2F]/95 p-2 md:w-[160px]">
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
