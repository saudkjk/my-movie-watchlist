"use server";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
export default async function AuthButtons() {
    return (
        <>
            <SignedOut>
                <SignInButton>
                    <button className='hover:text-blue-600 font-semibold '>
                        Login
                    </button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </>
    );
}
