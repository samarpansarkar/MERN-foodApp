import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets.js';
import { useState } from "react";

const Navbar = ({ showLogin, setShowLogin }) => {
    const [menu, setMenu] = useState('home');

    return (
        <div className="p-20px flex justify-between items-center ">
            <img src={assets.logo} alt="Logo" className="w-36" />
            <ul className="flex list-none gap-5 text-[#49557e] text-lg cursor-pointer">
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "pb-1 border-b-2 border-solid border-orange-600" : ""}>home</Link>   {/*  pb-1 border-b-2 border-solid border-orange-600 */}
                <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "pb-1 border-b-2 border-solid border-orange-600" : ""}>menu</a>
                <a href="#app-download" onClick={() => setMenu("mobile")} className={menu === "mobile" ? "pb-1 border-b-2 border-solid border-orange-600" : ""}>mobile app</a>
                <a href="#footer" onClick={() => setMenu("contact")} className={menu === "contact" ? "pb-1 border-b-2 border-solid border-orange-600" : ""}>contact us</a>
            </ul>
            <div className="flex items-center gap-10">
                <img src={assets.search_icon} alt="Search" className="relative" />
                <div className="relative">
                    <img src={assets.basket_icon} alt="" />
                    <div className="absolute min-w-3 min-h-3 bg-orange-600 border-solid rounded-[50%] top-[-8px] right-[-8px]"></div>
                </div>
                <button onClick={() => { showLogin ? setShowLogin(false) : setShowLogin(true) }} className="text-base px-3 py-2 border-2 border-solid border-orange-300 rounded-2xl  hover:bg-orange-600 hover:text-white">sign in</button>
            </div>
        </div>
    )
}

export default Navbar
