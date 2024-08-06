import Link from "next/link";

export default function ResetFilters() {
  return (
    <Link
      href="/genre"
      className="flex items-center gap-1 text-base lg:text-lg"
    >
      <span className="ml-1 text-red-500">x</span> reset
    </Link>
  );
}
