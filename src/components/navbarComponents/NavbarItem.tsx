"use client";
import { usePathname, useSearchParams } from "next/navigation";

type NavbarItemProps = {
  title: string;
  href: string;
  path: string;
  children?: React.ReactNode;
};

export default function NavbarItem({ title, href, path }: NavbarItemProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const realPathname = pathname.split("/")[1];

  let currentPath = "";
  if (searchParams.get("genre")) {
    currentPath = searchParams.get("genre") ?? path;
  }
  return (
    <a
      href={href}
      key={title}
      className={`font-semibold hover:text-blue-600 ${
        currentPath === path || realPathname === path
          ? "rounded-lg underline decoration-blue-500 decoration-4 underline-offset-8"
          : ""
      }`}
    >
      {title}
    </a>
  );
}
