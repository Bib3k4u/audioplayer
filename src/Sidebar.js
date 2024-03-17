import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='bg-[#2A2A2A] shadow-lg h-24 md:h-screen lg:h-screen xl:h-screen text-sm flex flex-col justify-start text-center font-serif font-semibold tracking-wider'>

            <div className=''>
                <Link className='flex flex-row justify-center m-2 animate-pulse shadow-white drop-shadow-lg' to="/">
                    <img className=' rounded-full flex flex-row justify-center animate-spin' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROjJ1uzte6eT2DyCuGpuQyrXdUxJNq_Cu3sA&usqp=CAU" alt="logo" />
                </Link>
                <div className=''>
                    <Link className='mb-2 bg-violet-400 p-2 hover:bg-violet-500' to="/">Upload song</Link>
                    <Link className='bg-violet-400 mb-2 p-2 hover:bg-violet-500' to="/">My Playlist</Link>
                    <Link className='bg-violet-400 mb-2 p-2 hover:bg-violet-500' to="/">Recent</Link>
                    <Link className='bg-violet-400 mb-2 p-2 hover:bg-violet-500' to="/">Top-10</Link>
                </div>
            </div>

        </div>
    )
}

export default Sidebar
