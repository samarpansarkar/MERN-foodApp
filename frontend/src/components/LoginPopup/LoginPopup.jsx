import { useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/userSlice";
import { BASE_API } from "../../constant";

const LoginPopup = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const url = BASE_API;
  const [currentState, setCurrentState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let newUrl = url;
      let response;

      if (currentState === "Login") {
        newUrl += "/api/user/login";
        response = await axios.post(newUrl, userData);

        if (response.data.success) {
          toast.success("Welcome back! 🎉");
          dispatch(setToken(response.data.token));
          setShowLogin(false);
        } else {
          toast.error(response.data.message || "Login failed");
        }
      } else {
        newUrl += "/api/user/register";
        response = await axios.post(newUrl, userData);

        if (response.data.success) {
          toast.success("Account created successfully! 🎉");
          dispatch(setToken(response.data.token));
          setShowLogin(false);
        } else {
          toast.error(response.data.message || "Registration failed");
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in'>
      <form
        onSubmit={onLogin}
        className='relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 mx-4 animate-scale-in'
      >
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className='absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors'
        >
          <img src={assets.cross_icon} alt='Close' className='w-4 h-4' />
        </button>

        <div className='mb-6'>
          <h2 className='text-3xl font-bold text-gray-900 mb-1'>
            {currentState}
          </h2>
          <p className='text-gray-600 text-sm'>
            {currentState === "Login"
              ? "Welcome back! Please login to continue"
              : "Create an account to get started"}
          </p>
        </div>

        <div className='space-y-4'>
          {currentState === "Sign Up" && (
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Full Name
              </label>
              <input
                type='text'
                placeholder='John Doe'
                required
                name='name'
                value={userData.name}
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all'
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </div>
          )}

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email Address
            </label>
            <input
              type='email'
              placeholder='you@example.com'
              required
              name='email'
              value={userData.email}
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all'
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <input
              type='password'
              placeholder='••••••••'
              required
              name='password'
              value={userData.password}
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all'
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            {currentState === "Sign Up" && (
              <p className='text-xs text-gray-500 mt-1'>
                Must be at least 8 characters with uppercase, lowercase & number
              </p>
            )}
          </div>

          <div className='flex items-start gap-2'>
            <input
              type='checkbox'
              required
              className='mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500'
            />
            <p className='text-sm text-gray-600'>
              I agree to the{" "}
              <span className='text-primary-600 hover:underline cursor-pointer'>
                Terms of Service
              </span>{" "}
              and{" "}
              <span className='text-primary-600 hover:underline cursor-pointer'>
                Privacy Policy
              </span>
            </p>
          </div>
        </div>

        <Button
          type='submit'
          variant='primary'
          className='w-full mt-6'
          loading={loading}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" color="white" />
              Processing...
            </span>
          ) : (
            currentState === "Sign Up" ? "Create Account" : "Login"
          )}
        </Button>

        <div className='mt-6 text-center text-sm'>
          {currentState === "Sign Up" ? (
            <p className='text-gray-600'>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setCurrentState("Login")}
                className='text-primary-600 font-semibold hover:text-primary-700 hover:underline'
              >
                Login here
              </button>
            </p>
          ) : (
            <p className='text-gray-600'>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setCurrentState("Sign Up")}
                className='text-primary-600 font-semibold hover:text-primary-700 hover:underline'
              >
                Sign up
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
