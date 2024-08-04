"use server";

export default async function PageTitle({ title }: { title: string }) {
  return (
    <div className="mb-0 mt-4 flex items-center text-lg font-bold  md:mb-1 md:mt-2 md:text-2xl">
      {title}
    </div>
  );
}
