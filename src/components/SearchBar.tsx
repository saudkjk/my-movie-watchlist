"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GrSearch } from "react-icons/gr";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query")?.toString() || "",
  );

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        const params = new URLSearchParams();
        params.set("query", searchQuery);
        router.replace(`/search?${params.toString()}`);
      }
    }, 200);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchQuery, router]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form
      className="relative flex w-[50%] items-center justify-end"
      onSubmit={(e) => e.preventDefault()} // Prevent form submission
    >
      <div className="w-full justify-end">
        <input
          type="text"
          name="search"
          placeholder="Search for Movies..."
          value={searchQuery}
          onChange={handleInputChange}
          className={`w-full items-center rounded-md border border-gray-200 bg-transparent px-2 py-1.5 text-sm placeholder-gray-200 transition-all duration-300 ease-in-out md:text-base md:outline-none`}
        />
        <GrSearch
          size={24}
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 transform text-3xl md:block"
        />
      </div>
    </form>
  );
}
