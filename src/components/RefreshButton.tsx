"use client";
import { useRouter } from "next/navigation";
import React from "react";

function RefreshButton({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const handleClick = () => {
    router.refresh();
  };
  return (
    <button
      className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-slate-50"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default RefreshButton;
