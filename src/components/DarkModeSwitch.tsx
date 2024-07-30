"use client";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { SetStateAction } from "react";

export default function DarkModeSwitch() {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleClick = (newTheme: SetStateAction<string>) => {
    setTheme(newTheme);
  };

  return (
    <div className="mr-3 flex items-center justify-center transition duration-500 ease-in-out md:ml-3">
      {currentTheme === "dark" ? (
        <MdLightMode
          onClick={() => handleClick("light")}
          className="transform cursor-pointer text-3xl transition duration-500 ease-in-out hover:scale-125"
        />
      ) : (
        <MdDarkMode
          onClick={() => handleClick("dark")}
          className="transform cursor-pointer text-3xl transition duration-500 ease-in-out hover:scale-125"
        />
      )}
    </div>
  );
}
