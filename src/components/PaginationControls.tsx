"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AnimatedBorder from "./AnimatedBorder";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

export default function PaginationControls() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  let paramName = "";
  let param = "";
  if (searchParams.get("query")) {
    param = searchParams.get("query") ?? "";
    paramName = "query";
  } else {
    param = searchParams.get("genre") ?? "";
    paramName = "genre";
  }

  const handlePageChange = (newPage: number) => {
    router.push(`${pathname}?${paramName}=${param}&page=${newPage}`);
  };

  return (
    <div className="flex justify-center gap-2">
      {!(Number(page) <= 1) ? (
        <div className="mb-3 mt-4">
          <AnimatedBorder>
            <button
              className={`min-w-[100px] rounded-md bg-white px-1 py-1 hover:bg-transparent dark:bg-black dark:hover:bg-transparent`}
              disabled={Number(page) <= 1}
              onClick={() => handlePageChange(Number(page) - 1)}
            >
              <div className="flex items-center justify-center py-0.5 text-black dark:text-white">
                <GoChevronLeft className="" />
                <p className="mr-2">Previous</p>
              </div>
            </button>
          </AnimatedBorder>
        </div>
      ) : (
        <div className={`min-w-[100px] px-1 py-1`}></div>
      )}

      <div className="text-md mt-6">Page {page}</div>

      <div className="mb-3 mt-4">
        <AnimatedBorder>
          <button
            className="min-w-[100px] rounded-md bg-white px-1 py-1 hover:bg-transparent dark:bg-black dark:hover:bg-transparent"
            onClick={() => handlePageChange(Number(page) + 1)}
          >
            <div className="flex items-center justify-center py-0.5">
              <p className="ml-2">Next</p> <GoChevronRight />
            </div>
          </button>
        </AnimatedBorder>
      </div>
    </div>
  );
}
