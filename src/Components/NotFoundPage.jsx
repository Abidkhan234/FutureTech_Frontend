import React from 'react'
import { IoIosWarning } from 'react-icons/io'
import { Link } from 'react-router'

const NotFoundPage = () => {
    return (
        <div className='min-h-screen bg-[#1E1E1E] w-full flex items-center justify-center text-red-500'>
            <div className="flex flex-col gap-4 items-center">
                <IoIosWarning className='text-9xl' />
                <h1 className='text-6xl font-bold'>404</h1>
                <h2 className='text-3xl font-semibold'>Page Not Found</h2>
                <Link className='font-medium border py-3 px-10 text-lg rounded-sm' to={`/`}>Go Back</Link>
            </div>
        </div>
    )
}

export default NotFoundPage