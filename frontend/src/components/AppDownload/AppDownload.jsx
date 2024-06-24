import React from 'react'
import { assets } from '../../assets/assets'

const AppDownload = () => {
    return (
        <div className='m-auto mx-3 mt-28 text-center border rounded-xl p-2 text-orange-500  duration-300 hover:bg-orange-500 hover:text-white' id='app-download'>
            <p className='text-2xl  font-semibold'>For Better Experience Download <br /> Tomato App</p>
            <div className='flex justify-center gap-20 mt-10'>
                <img src={assets.play_store} alt='play store' className='cursor-pointer duration-300 ease-in hover:scale-125' />
                <img src={assets.app_store} alt='app store' className='cursor-pointer duration-300 ease-in hover:scale-125' />
            </div>
        </div>
    )
}

export default AppDownload
