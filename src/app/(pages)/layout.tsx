import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "../globals.css";
import { ThemeProvider } from "../ThemeProvider";
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
            <html lang='en' className='!scroll-smooth' >
                <body className={inter.className}>
                    <ThemeProvider
                        attribute='class'
                        defaultTheme='system'
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Header />
                        <main className='container mx-auto'>
                            {children}
                        </main>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
