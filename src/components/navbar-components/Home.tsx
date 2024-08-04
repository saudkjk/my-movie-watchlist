"use server";
export default async function NavbarLinks({
  className,
}: {
  className?: string;
}) {
  return (
    // <div className={`ml-2 ${className}`}>
    //   <a href="/" className={`font-bold hover:text-red-600`}>
    //     <span className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-xl text-transparent hover:text-blue-600 lg:text-2xl">
    //       Home
    //     </span>
    //   </a>
    // </div>
    <a href="/">
      <div className="flex flex-col items-center text-base font-bold">
        MyMovie
        <span className="-mt-1.5 inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          Watchlist
        </span>
      </div>
    </a>
  );
}
