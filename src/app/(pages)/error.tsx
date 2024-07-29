"use client";
export default function ErrorPage() {
    return (
        <div className='mt-4 flex items-center justify-center  text-black  dark:text-gray-200'>
            <div className='text-center p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800'>
                <div className='text-4xl font-bold mb-4'>Oops!</div>
                <p className='text-lg mb-4'>Something went wrong.</p>
                <a
                    href='/'
                    className='inline-block px-6 py-3 bg-red-700 text-white rounded-full hover:bg-red-400  transition'
                >
                    Go back to Home
                </a>
            </div>
        </div>
    );
}
