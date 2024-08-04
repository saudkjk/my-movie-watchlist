"use server";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
export default async function AuthButtons() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="font-semibold hover:text-blue-600">Login</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton  />
      </SignedIn>
    </>
  );
}
