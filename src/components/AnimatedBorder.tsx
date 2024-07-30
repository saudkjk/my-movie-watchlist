import React from "react";

export default async function AnimatedBorder({ children }: any) {
  console.log("consel?");
  return (
    <div className="animate-gradient-animation rounded-lg bg-gradient-to-r from-pink-500 via-blue-500 to-indigo-900 bg-[length:200%_200%] p-0.5">
      {children}
    </div>
  );
}
