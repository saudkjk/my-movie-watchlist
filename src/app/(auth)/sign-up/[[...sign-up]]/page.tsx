"use client";
import { motion } from "framer-motion";
import { SignUp } from "@clerk/nextjs";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
export default function AuroraBackgroundDemo() {
    return (
        <HeroHighlight>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [20, -5, 0] }}
                transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
                className='h-screen text-5xl px-4  lg:text-6xl font-bold text-white leading-relaxed lg:leading-snug text-center '
            >
                <div className='mt-16'>
                    My Movie
                    <br />
                    <Highlight className=' text-white'>Watchlist</Highlight>
                </div>
                <div className='flex items-center justify-center mt-32'>
                    <SignUp />
                </div>
            </motion.h1>
        </HeroHighlight>
    );
}
