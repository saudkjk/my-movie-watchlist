"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

const searchSchema = z.object({
  query: z
    .string()
    .min(1, "Search query must not be empty")
    .max(100, "Search query is too long"),
});

export default function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((searchQuery: string) => {
    const validationResult = searchSchema.safeParse({ query: searchQuery });

    const params = new URLSearchParams();
    if (validationResult.success) params.set("query", searchQuery);

    router.replace(`/search?${params.toString()}`);
  }, 400);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-grow">
      <Input
        type="text"
        placeholder="Search for movies..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        className="w-full"
      />
      <button type="submit" className="hidden">
        Search
      </button>
    </form>
  );
}
