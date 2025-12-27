import { Link, useNavigate } from "react-router-dom";
import { IoIosCart } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag, HiOutlineLogout } from "react-icons/hi";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { StoreContext } from "../../context/StoreContext.jsx";
import Button from "../UI/Button";

const Navbar = ({ showLogin, setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  // Calculate total cart items
  const cartItemCount = Object.values(cartItems || {}).reduce((acc, qty) => acc + qty, 0);

  const logOut = () => {
    setToken(null);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className='sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm py-4 px-0 animate-slide-up'>
      <div className='flex justify-between items-center'>
        {/* Logo */}
        <Link to='/' className='flex items-center'>
          <h1 className='text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 transition-all'>
            SpaNFood
          </h1>
        </Link>

        {/* Navigation Menu - Hidden on mobile */}
        <ul className='hidden md:flex items-center gap-8 text-lg'>
          <li>
            <a
              href='/'
              onClick={() => setMenu("home")}
              className={`capitalize cursor-pointer transition-all duration-200 ${menu === "home"
                  ? "text-primary-600 font-semibold border-b-2 border-primary-600 pb-1"
                  : "text-gray-600 hover:text-primary-600"
                }`}
            >
              home
            </a>
          </li>
          <li>
            <a
              href='#explore-menu'
              onClick={() => setMenu("menu")}
              className={`capitalize cursor-pointer transition-all duration-200 ${menu === "menu"
                  ? "text-primary-600 font-semibold border-b-2 border-primary-600 pb-1"
                  : "text-gray-600 hover:text-primary-600"
                }`}
            >
              menu
            </a>
          </li>
        </ul>

        {/* Right Section */}
        <div className='flex items-center gap-4 md:gap-6'>
          {/* Cart Icon */}
          <Link to='/cart' className='relative group'>
            <IoIosCart
              size={32}
              className='text-gray-700 group-hover:text-primary-600 transition-colors cursor-pointer'
            />
            {cartItemCount > 0 && (
              <div className='absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in'>
                {cartItemCount}
              </div>
            )}
          </Link>

          {/* Login/Profile */}
          {!token ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLogin(true)}
              className="hidden md:inline-flex"
            >
              Login
            </Button>
          ) : (
            <div className='relative group'>
              {/* Profile Icon */}
              <div className='cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors'>
                <FiUser size={24} className='text-gray-700' />
              </div>

              {/* Dropdown Menu */}
              <ul className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 -translate-y-2'>
                <li
                  onClick={() => navigate("/myorders")}
                  className='flex items-center gap-3 px-4 py-3 hover:bg-primary-50 cursor-pointer transition-colors'
                >
                  <HiOutlineShoppingBag size={20} className='text-gray-600' />
                  <p className='text-gray-700 font-medium'>My Orders</p>
                </li>
                <hr className='my-1 border-gray-200' />
                <li
                  onClick={logOut}
                  className='flex items-center gap-3 px-4 py-3 hover:bg-red-50 cursor-pointer transition-colors'
                >
                  <HiOutlineLogout size={20} className='text-red-600' />
                  <p className='text-red-600 font-medium'>Logout</p>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Login Button */}
          {!token && (
            <button
              onClick={() => setShowLogin(true)}
              className='md:hidden p-2 text-primary-600 font-semibold'
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
