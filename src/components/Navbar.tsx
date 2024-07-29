"use server";
import DarkModeSwitch from "./DarkModeSwitch";
import AuthButtons from "./navbarComponents/AuthButtons";
import DesktopNav from "./navbarComponents/DesktopNav";
import Logo from "./navbarComponents/Logo";
import Home from "./navbarComponents/Home";
import MobileNav from "./navbarComponents/MobileNav";
import GenreNav from "./navbarComponents/GenreNav";

export default async function Navbar() {
  return (
    <div className='flex justify-between items-center relative w-full'>

      <div className='flex-1 flex w-full '>
        <div className='md:hidden'> <MobileNav /> </div>
        <div className='hidden md:flex'> <Home /> </div>
        <GenreNav />
      </div>

      <div className='hidden md:flex'> <DesktopNav /> </div>
      <div className='md:hidden'> <Logo /> </div>

      <div className='flex-1 flex w-full justify-end'>
        <div className='flex md:relative p-1 lg:text-lg gap-3 md:gap-0 '>
          <AuthButtons />
          <DarkModeSwitch />
        </div>
      </div>

    </div>
  );
}