import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

function page() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60">
      <SignIn />
      <Link href="/" className="mt-2 text-red-500 hover:text-red-700">
        Cancel
      </Link>
    </div>
  );
}

export default page;
