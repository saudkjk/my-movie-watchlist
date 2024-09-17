import type { Metadata } from "next";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import ScrollListener from "@/components/navbar-components/ScrollListener";
import NavBar from "@/components/navbar-components/Navbar";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "My Movie Watchlist",
  description:
    "Movie watchlist app to add movies you'd like to watch or watched already",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        signIn: { variables: { colorPrimary: "#009090" } },
        signUp: { variables: { colorPrimary: "#009090" } },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <main>
            <ScrollListener>
              <NavBar />
            </ScrollListener>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
