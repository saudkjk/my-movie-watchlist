"use server";
import DarkModeSwitch from "@/components/DarkModeSwitch";
import Home from "@/components/navbar-components/Home";
import MobileNav from "@/components/navbar-components/MobileNav";
import DesktopNav from "@/components/navbar-components/DesktopNav";
import AuthButtons from "@/components/navbar-components/AuthButtons";
import SearchForm from "./SearchForm";

export default async function Navbar() {
  return (
    <>
      <div className="container z-50 flex items-center justify-between gap-4 bg-white py-2 dark:bg-slate-950">
        <MobileNav />
        <Home />

        <div className="flex flex-1 justify-end gap-2 md:gap-1 lg:text-lg">
          <AuthButtons />
          <DarkModeSwitch />
        </div>
      </div>

      <div className="container z-50 hidden flex-grow items-center justify-between gap-2 bg-white py-2 dark:bg-slate-950 md:flex">
        <DesktopNav />
        <SearchForm />
      </div>
    </>
  );
}
