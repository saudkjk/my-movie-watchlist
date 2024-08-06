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
      <div className="sticky top-0 z-50 flex items-center justify-between bg-white bg-opacity-85 p-2 md:container dark:bg-slate-950 dark:bg-opacity-85">
        <div className="ml-2 flex flex-1 md:ml-0 md:flex-none md:gap-2">
          <MobileNav className="md:hidden" />
          <Home />
          <div className="hidden gap-2 md:flex">
            <DesktopNav />
          </div>
        </div>
        <div className="mr-2 flex justify-end gap-2 md:mr-0 md:gap-1 lg:text-lg">
          <SearchForm />
          <AuthButtons />
          <div className="hidden md:flex">
            <DarkModeSwitch />
          </div>
        </div>
      </div>
    </>
  );
}
// export default async function Navbar() {
//   return (
//     <>
//       <div className="container z-50 flex items-center justify-between bg-white pt-2 dark:bg-slate-950">
//         <div className="flex flex-1 md:flex-none">
//           <MobileNav className="flex-1 md:hidden" />
//           <Home className="flex-1 text-center md:flex-none" />
//         </div>
//         <div className="ml-4 hidden gap-2 md:flex md:flex-1">
//           <DesktopNav />
//         </div>
//         <div className="flex flex-1 justify-end gap-2 md:gap-1 lg:text-lg">
//           <SearchForm />
//           <AuthButtons />
//           <div className="hidden md:flex">
//             <DarkModeSwitch />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default async function Navbar() {
//   return (
//     <>
//       <div className="container z-50 flex items-center justify-between bg-white pt-2 dark:bg-slate-950">
//         <MobileNav className="flex-1 md:hidden" />
//         <div className="flex md:flex-none">
//           <Home className="flex-1 text-center md:flex-none" />
//         </div>
//         <div className="ml-4 hidden gap-2 md:flex md:flex-1">
//           <DesktopNav />
//         </div>
//         <div className="flex flex-1 justify-end gap-2 md:flex-none md:gap-1 lg:text-lg">
//           <SearchForm />
//           <AuthButtons />
//           <div className="hidden md:flex">
//             <DarkModeSwitch />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
