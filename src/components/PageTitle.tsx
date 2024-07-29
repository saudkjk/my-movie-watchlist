"use server";

export default async function PageTitle({ title }: { title: string }) {
    return (
        <div className=' bg-opacity-50 mt-4 md:mt-0 mb-0'>
            <div className='text-gray-700 dark:text-gray-200 flex items-center '>
                <div className='text-lg md:text-2xl  xl:text-3xl font-bold'>
                    {title}
                </div>
            </div>
        </div>
    );
}
