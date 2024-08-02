"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import AnimatedBorder from "@/components/ui/AnimatedBorder";
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
    <div className="container mx-auto mt-20 md:mt-2">
      <form className="flex" onSubmit={(e) => e.preventDefault()}>
        <div className="flex-grow">
          <AnimatedBorder>
            <Input
              type="text"
              placeholder="Search for movies..."
              onChange={(e) => handleSearch(e.target.value)}
              defaultValue={searchParams.get("query")?.toString()}
            />
          </AnimatedBorder>
        </div>
        <button type="submit" className="hidden">
          Search
        </button>
      </form>
    </div>
  );
}
