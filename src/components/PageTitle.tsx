"use server";

export default async function PageTitle({ title }: { title: string }) {
  return (
    <div className="mb-0 mt-4 bg-opacity-50 md:mt-0">
      <div className="flex items-center text-gray-700 dark:text-gray-200">
        <div className="text-lg font-bold md:text-2xl xl:text-3xl">{title}</div>
      </div>
    </div>
  );
}
