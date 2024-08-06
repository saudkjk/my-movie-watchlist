"use server";

export default async function PageTitle({ title }: { title: string }) {
  return (
    <div className="mb-3 mt-2 flex items-center text-lg font-bold md:mb-3 md:text-2xl">
      {title}
    </div>
  );
}
