import { assets } from "../../assets/assets"

const Footer = () => {
    return (
        <div className='text-white bg-orange-500 flex-col items-center px-24 py-3 mt-10 gap-5 h-auto' id='footer'>
            <div className='w-auto flex justify-between gap-20 '>
                <div className='flex-col p-2 gap-5'>
                    <img src={assets.logo} alt="logo" className="p-1 mb-4" />
                    <p>Reprehenderit anim occaecat non id nostrud quis ad officia ullamco adipisicing aute exercitation in ullamco. Anim nisi Lorem ut sint Lorem exercitation proident laborum deserunt aliqua pariatur amet. Consequat proident quis incididunt ea nostrud dolore occaecat cillum velit pariatur. Sit est incididunt adipisicing reprehenderit irure nulla quis Lorem excepteur ex amet. Voluptate exercitation ipsum aliqua laborum voluptate labore anim fugiat veniam anim veniam aute. Laborum excepteur elit fugiat ex exercitation incididunt consequat eu ex do.</p>
                    <div className="flex mt-4 gap-10 justify-center">
                        <img src={assets.facebook_icon} alt="facebook" className="hover:scale-105" />
                        <img src={assets.twitter_icon} alt="twitter" className="hover:scale-105" />
                        <img src={assets.linkedin_icon} alt="linkedin" className="hover:scale-105" />
                    </div>
                </div>
                <div className='p-1'>
                    <h2 className="text-xl underline">COMPANY</h2>
                    <ul className="text-lg">
                        <li className="hover:scale-105">Home</li>
                        <li className="hover:scale-105">About Us</li>
                        <li className="hover:scale-105">Delivery</li>
                        <li className="hover:scale-105">Privacy Policy</li>
                    </ul>
                </div>
                <div className=''>
                    <h2 className="text-xl underline">GET IN TOUCH</h2>
                    <ul className="text-lg">
                        <li className="hover:scale-105">+91 1234567890</li>
                        <li className="hover:scale-105">contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr className="border-2 my-2 rounded-full" />
            <p className='text-center text-gray-700 text-base'>2024 Tomato Cuisine. All rights reserved.</p>
        </div>
    )
}

export default Footer
