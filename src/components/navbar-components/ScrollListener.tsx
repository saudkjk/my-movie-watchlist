"use client";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ScrollListenerProps {
  children: React.ReactNode;
}

const ScrollListener: React.FC<ScrollListenerProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  const [lenisRef, setLenis] = useState(null as Lenis | null);
  const [rafState, setRafState] = useState(null as number | null);

  const pathname = usePathname();

  useEffect(() => {
    const scroller = new Lenis();
    let rf;

    function raf(time: number) {
      scroller.raf(time);
      requestAnimationFrame(raf);
    }

    rf = requestAnimationFrame(raf);
    setRafState(rf);
    setLenis(scroller);

    return () => {
      if (lenisRef) {
        cancelAnimationFrame(rafState!);
        lenisRef.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${pathname === "/" || pathname.includes("/movie") || pathname.includes("/list") ? "" : "mb-[100px]"} `}
    >
      <div
        className={`fixed top-0 z-50 flex w-full items-center justify-between gap-4 px-[4%] py-2 md:py-4 transition-all duration-1000 md:px-[8%] ${
          scrolled ? "shadow-md backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollListener;
