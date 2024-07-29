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
    const realPathname = pathname.split('/')[1];

    let currentPath = "";
    if (searchParams.get("genre")) {
        currentPath = searchParams.get("genre") ?? path;
    }
    return (
        <a
            href={href}
            className={` hover:text-blue-600 font-semibold ${currentPath === path || realPathname === path
                ? "underline underline-offset-8 decoration-4 decoration-blue-500 rounded-lg"
                : ""
                }`}
        >
            {title}
        </a>
    );
}
