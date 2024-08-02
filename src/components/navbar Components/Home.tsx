"use server";
export default async function NavbarLinks({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={`ml-2 mt-1 ${className}`}>
      <a href="/" className={`font-bold hover:text-red-600`}>
        <span className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-xl text-transparent hover:text-blue-600 lg:text-2xl">
          Home
        </span>
      </a>
    </div>
  );
}
