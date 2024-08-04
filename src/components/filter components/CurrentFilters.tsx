"use client";
import React, { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CurrentFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const genres = searchParams.get("genre")?.split(",") || [];

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const existingValues = params.get(name)?.split(",") || [];
      const newValues = existingValues.filter((v) => v !== value);
      if (newValues.length > 0) {
        params.set(name, newValues.join(","));
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="m-0 flex gap-2 p-0">
      {genres.map((genre) => (
        <Link
          key={genre}
          legacyBehavior
          passHref
          href={pathname + "?" + createQueryString("genre", genre)}
        >
          <a className="flex items-center gap-0.5 rounded-md border p-1 text-sm hover:bg-slate-300">
            {genre} <span className="text-red-500">x</span>
          </a>
        </Link>
      ))}
    </div>
  );
}
