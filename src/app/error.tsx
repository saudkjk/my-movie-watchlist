"use client";
export default function ErrorPage() {
  return (
    <div className="mt-4 flex items-center justify-center text-black dark:text-gray-200">
      <div className="rounded-lg bg-white p-6 text-center shadow-lg dark:bg-gray-800">
        <div className="mb-4 text-4xl font-bold">Oops!</div>
        <p className="mb-4 text-lg">Something went wrong.</p>
        <a
          href="/"
          className="inline-block rounded-full bg-red-700 px-6 py-3 text-white transition hover:bg-red-400"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
}
