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
    <div className="relative flex w-full items-center justify-between">
      <div className="flex w-full flex-1">
        <MobileNav className="md:hidden" />
        <Home className="hidden md:flex" />
        <GenreNav />
      </div>

      <div className="hidden md:flex">
        <DesktopNav />
      </div>
      <Logo className="md:hidden" />

      <div className="flex w-full flex-1 justify-end gap-3 p-1 md:relative md:gap-0 lg:text-lg">
        <AuthButtons />
        <DarkModeSwitch />
      </div>
    </div>
  );
}
