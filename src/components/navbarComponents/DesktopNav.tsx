"use server";
import NavbarItem from "./NavbarItem";

export default async function DesktopNav() {
  return (
    <div
      className={`mt-1 flex-1 flex-grow justify-center gap-4 py-4 text-sm md:flex lg:text-lg`}
    >
      <NavbarItem title="Trending" href="/genre?genre=trending" path="trending" />
      <NavbarItem title="Top Rated" href="/genre?genre=toprated" path="toprated" />
      <NavbarItem title="Browse Watchlists" href="/browse" path="browse" />
      <NavbarItem title="Watchlist" href="/watchlist" path="watchlist" />
      <NavbarItem title="Completed" href="/completed" path="completed" />
    </div>
  );
}
