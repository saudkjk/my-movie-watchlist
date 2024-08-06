"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";
import { GrSearch } from "react-icons/gr";

const searchSchema = z.object({
  query: z
    .string()
    .min(1, "Search query must not be empty")
    .max(100, "Search query is too long"),
});

export default function SearchForm() {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (searchQuery: string) => {
    const validationResult = searchSchema.safeParse({ query: searchQuery });

    const params = new URLSearchParams();
    if (validationResult.success) params.set("query", searchQuery);

    router.replace(`/search?${params.toString()}`);
  };

  const handleDebouncedSearch = useDebouncedCallback((searchQuery: string) => {
    handleSearch(searchQuery);
  }, 350);

  const handleSubmit = (e: React.FormEvent, searchQuery: string) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus();
    }
  }, [showInput]);

  return (
    <form
      onSubmit={(e) => handleSubmit(e, inputRef.current?.value || "")}
      className="relative flex items-center"
    >
      <div className="relative inline-block">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search"
          onChange={(e) => handleDebouncedSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
          onBlur={() => setShowInput(false)}
          className={`h-9 border border-transparent bg-transparent pl-9 text-lg outline-none transition-all duration-300 ease-in-out placeholder:text-base ${
            showInput
              ? "w-32 rounded-sm border border-slate-950 dark:border-white lg:w-56"
              : "w-32 rounded-sm border border-slate-950 dark:border-white md:w-0 md:border-transparent dark:md:border-transparent"
          }`}
        />
        <GrSearch
          size={24}
          className="absolute left-2 top-1/2 -translate-y-1/2 transform cursor-pointer text-3xl"
          onClick={() => setShowInput(!showInput)}
        />
      </div>
      <button type="submit" className="hidden">
        Search
      </button>
    </form>
  );
}
