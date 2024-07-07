import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";

import "./Navbar.css";

const Navbar = ({ showLogin, setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logOut = () => {
    setToken(null);
    localStorage.removeItem("token");
    nevigate("/");
  };

  return (
    <div className='p-20px flex justify-between items-center '>
      <Link to='/'>
        <img src={assets.logo} alt='Logo' className='w-36' />
      </Link>
      <ul className='flex list-none gap-5 text-[#49557e] text-lg cursor-pointer'>
        <Link
          to='/'
          onClick={() => setMenu("home")}
          className={
            menu === "home"
              ? "pb-1 border-b-2 border-solid border-orange-600"
              : ""
          }>
          home
        </Link>{" "}
        {/*  pb-1 border-b-2 border-solid border-orange-600 */}
        <a
          href='#explore-menu'
          onClick={() => setMenu("menu")}
          className={
            menu === "menu"
              ? "pb-1 border-b-2 border-solid border-orange-600"
              : ""
          }>
          menu
        </a>
        <a
          href='#app-download'
          onClick={() => setMenu("mobile")}
          className={
            menu === "mobile"
              ? "pb-1 border-b-2 border-solid border-orange-600"
              : ""
          }>
          mobile app
        </a>
        <a
          href='#footer'
          onClick={() => setMenu("contact")}
          className={
            menu === "contact"
              ? "pb-1 border-b-2 border-solid border-orange-600"
              : ""
          }>
          contact us
        </a>
      </ul>
      <div className='flex items-center gap-10'>
        <img src={assets.search_icon} alt='Search' className='relative' />
        <div className='relative'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt='' />
          </Link>
          <div
            className={
              getTotalCartAmount() === 0
                ? ""
                : "absolute min-w-3 min-h-3 bg-orange-600 border-solid rounded-[50%] top-[-8px] right-[-8px] animate-bounce"
            }></div>
        </div>
        {!token ? (
          <button
            onClick={() => {
              showLogin ? setShowLogin(false) : setShowLogin(true);
            }}
            className='text-base px-3 py-2 border-2 border-solid border-orange-300 rounded-2xl  hover:bg-orange-600 hover:text-white'>
            Login
          </button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='profile' />
            <ul className='navbar-profile-dropdown'>
              <li>
                <img src={assets.bag_icon} alt='' />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logOut}>
                <img src={assets.logout_icon} alt='' />
                <p>Logout</p>
              </li>
              <hr />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
