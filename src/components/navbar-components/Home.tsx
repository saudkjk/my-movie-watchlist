"use server";
export default async function NavbarLinks({
  className,
}: {
  className?: string;
}) {
  return (
    <a href="/">
      <div className="mr-2 flex h-12 items-center text-base font-bold md:ml-0 md:h-14 md:text-lg">
        <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          MyMovieList
        </span>
      </div>
    </a>
  );
}
