import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "./ThemeProvider";
import Header from "@/components/Header";
export const runtime = "edge";

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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />

            <main className="px-4 py-4 sm:container sm:mx-auto">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
