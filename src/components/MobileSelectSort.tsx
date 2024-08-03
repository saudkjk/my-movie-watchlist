"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Link from "next/link";

export function MobileSelectSort() {
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
    <div className="flex justify-start gap-2">
      <Link
        href={pathname + "?" + createQueryString("sortBy", "popularity.desc")}
        className="h-10 w-full items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        Popularity
      </Link>
      <Link
        href={pathname + "?" + createQueryString("sortBy", "vote_average.desc")}
        className="h-10 w-full items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        Rating
      </Link>
    </div>
  );
}
