"use server";
export default async function Logo({ className }: { className?: string }) {
  return (
    <a href="/" aria-label="Home">
      <div
        className={`text-1xl flex flex-col items-center pt-1 font-bold text-stone-950 dark:text-slate-100 ${className}`}
      >
        My Movie
        <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          Watchlist
        </span>
      </div>
    </a>
  );
}
