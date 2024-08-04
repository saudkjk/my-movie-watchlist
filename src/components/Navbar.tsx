"use server";
import DarkModeSwitch from "./DarkModeSwitch";
import Logo from "./navbar components/Logo";
import Home from "./navbar components/Home";
import MobileNav from "./navbar components/MobileNav";
import DesktopNav from "./navbar components/DesktopNav";
import AuthButtons from "./navbar components/AuthButtons";

export default async function Navbar() {
  return (
    <div className="fixed z-50 flex w-full items-center justify-between bg-white bg-opacity-85 shadow-md dark:bg-slate-950 dark:bg-opacity-85">
      <div className="flex w-full flex-1">
        <MobileNav className="md:hidden" />
        <Home className="hidden md:flex" />
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
