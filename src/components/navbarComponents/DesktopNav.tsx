"use server";
import NavbarItem from "./NavbarItem";

export default async function DesktopNav() {
    return (
        <div className='md:flex flex-1 text-sm lg:text-lg  flex-grow justify-center py-4 gap-4 mt-1'>
            <NavbarItem title='Trending' href='/genre?genre=trending&page=1' path='trending' />
            <NavbarItem title='Top Rated' href='/genre?genre=toprated&page=1' path='toprated' />
            <NavbarItem title='Browse Watchlists' href='/browse' path='browse' />
            <NavbarItem title='Watchlist' href='/watchlist' path='watchlist' />
            <NavbarItem title='Completed' href='/completed' path='completed' />
        </div>
    );
}
