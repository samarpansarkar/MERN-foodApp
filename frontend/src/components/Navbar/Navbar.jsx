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
    navigate("/");
  };

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo} alt='Logo' className='logo' />
      </Link>
      <ul className='navbar-menu'>
        <Link
          to='/'
          onClick={() => setMenu("home")}
          className={
            menu === "home"
              ? "active"
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
              ? "active"
              : ""
          }>
          menu
        </a>
        <a
          href='#app-download'
          onClick={() => setMenu("mobile")}
          className={
            menu === "mobile"
              ? "active"
              : ""
          }>
          mobile app
        </a>
        <a
          href='#footer'
          onClick={() => setMenu("contact")}
          className={
            menu === "contact"
              ? "active"
              : ""
          }>
          contact us
        </a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt='Search' className='relative' />
        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt='' />
          </Link>
          <div
            className={
              getTotalCartAmount() === 0
                ? ""
                : "dot"
            }></div>
        </div>
        {!token ? (
          <button
            onClick={() => {
              showLogin ? setShowLogin(false) : setShowLogin(true);
            }}>
            Login
          </button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='profile' />
            <ul className='navbar-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
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
