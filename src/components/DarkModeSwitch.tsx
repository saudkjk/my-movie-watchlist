"use client";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { SetStateAction } from "react";

export default function DarkModeSwitch() {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleClick = (newTheme: SetStateAction<string>) => {
    setTheme(newTheme);
  };

  const iconVariants = {
    initial: { scale: 1 },
    animate: { scale: 1.2 },
  };

  return (
    <div className="mr-3 hover:text-blue-600 md:ml-3">
      {currentTheme === "dark" ? (
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="animate"
          whileTap="initial"
          onClick={() => handleClick("light")}
          style={{ cursor: "pointer" }}
        >
          <MdLightMode className="text-3xl" />
        </motion.div>
      ) : (
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="animate"
          whileTap="initial"
          onClick={() => handleClick("dark")}
          style={{ cursor: "pointer" }}
        >
          <MdDarkMode className="text-3xl" />
        </motion.div>
      )}
    </div>
  );
}
