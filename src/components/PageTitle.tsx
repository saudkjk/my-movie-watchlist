"use server";

export default async function PageTitle({ title }: { title: string }) {
  return (
    <div className="mb-0 mt-4 flex items-center bg-opacity-50 text-lg font-bold text-gray-700 dark:text-gray-200 md:mt-0 md:text-2xl xl:text-3xl">
      {title}
    </div>
  );
}
