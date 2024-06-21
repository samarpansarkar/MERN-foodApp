import headerImage from '../../../public/header_img.png'

const Header = () => {
    return (
        <div className="relative p-3 h-[34vw] m-auto bg-cover border-none rounded-2xl" style={{ backgroundImage: `url(${headerImage})` }} >
            <div className='absolute text-white font-semibold flex-col items-start gap-3 max-w-[50%] bottom-[10%] left-16'>
                <h2 className='font-bold text-7xl'>Order your favorite food here</h2>
                <p className='my-4 text-2xl'>
                    Choose from a diverse selection of authentic Indian cuisine. Enjoy your meal with ease.
                </p>
                <button className="text-base px-3 py-2 border-2 bg-orange-600 text-white border-solid border-orange-300 rounded-2xl  hover:bg-white hover:text-gray-600">View Menu</button>
            </div>
        </div>
    )
}

export default Header
