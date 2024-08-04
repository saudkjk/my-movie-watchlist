"use server";
export default async function Logo({ className }: { className?: string }) {
  return (
    <a href="/" aria-label="Home">
      <div
        className={`my-0.5 flex flex-col items-center py-1 font-bold ${className}`}
      >
        My Movie
        <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          Watchlist
        </span>
      </div>
    </a>
  );
}
