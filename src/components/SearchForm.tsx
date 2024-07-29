"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import AnimatedBorder from "@/components/AnimatedBorder";
import { useDebouncedCallback } from "use-debounce";

export default function SearchForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const handleSearch = useDebouncedCallback((searchQuery: string) => {
        const params = new URLSearchParams();
        if (searchQuery) {
            params.set("query", searchQuery);
            params.set("page", "1");
        }
        router.replace(`/search?${params.toString()}`);
    }, 400);

    return (
        <div className='container mx-auto'>
            <form className='flex' onSubmit={(e) => e.preventDefault()}>
                <div className='flex-grow'>
                    <AnimatedBorder>
                        <Input
                            type='text'
                            placeholder='Search for movies...'
                            onChange={(e) => handleSearch(e.target.value)}
                            defaultValue={searchParams.get("query")?.toString()}
                        />
                    </AnimatedBorder>
                </div>
                <button type='submit' className='hidden'>
                    Search
                </button>
            </form>
        </div>
    );
}
