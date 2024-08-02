"use server";
import DarkModeSwitch from "./DarkModeSwitch";
import AuthButtons from "./navbar Components/AuthButtons";
import DesktopNav from "./navbar Components/DesktopNav";
import Logo from "./navbar Components/Logo";
import Home from "./navbar Components/Home";
import MobileNav from "./navbar Components/MobileNav";
import GenreNav from "./navbar Components/GenreNav";

export default async function Navbar() {
  return (
    <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-white bg-opacity-85 pb-1 pt-1 shadow-md dark:bg-slate-950 dark:bg-opacity-85">
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
