// "use client";
// import { useTheme } from "next-themes";
// import { SetStateAction } from "react";
// import { Moon, Sun } from "lucide-react";

// export default function DarkModeSwitch() {
//   const { theme, setTheme, systemTheme } = useTheme();
//   const currentTheme = theme === "system" ? systemTheme : theme;

//   const handleClick = (newTheme: SetStateAction<string>) => {
//     setTheme(newTheme);
//   };

//   return (
//     <div className="flex items-center justify-center">
//       {currentTheme === "dark" ? (
//         <Sun
//           onClick={() => handleClick("light")}
//           className="h-7 w-7 cursor-pointer"
//         />
//       ) : (
//         <Moon
//           onClick={() => handleClick("dark")}
//           className="h-7 w-7 cursor-pointer"
//         />
//       )}
//     </div>
//   );
// }
