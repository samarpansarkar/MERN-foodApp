import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { IoIosCart } from "react-icons/io";
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
        <h1 className='text-3xl font-bold text-emerald-600'>SpaNFood</h1>
      </Link>
      <ul className='navbar-menu'>
        <a
          href='/'
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}>
          home
        </a>{" "}
        {/*  pb-1 border-b-2 border-solid border-orange-600 */}
        <a
          href='#explore-menu'
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}>
          menu
        </a>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-search-icon'>
          <Link to='/cart' className='text-emerald-600'>
            <IoIosCart size={30} />
          </Link>
          <div
            className={
              getTotalCartAmount() === 0 ? "" : "dot bg-emerald-500"
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
              <li onClick={() => navigate("/myorders")}>
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
