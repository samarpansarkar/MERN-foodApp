import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, token, setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Login");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
      const response = await axios.post(newUrl, userData);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } else {
      newUrl += "/api/user/register";
      console.log(newUrl);
      let response;
      try {
        response = await axios.post(newUrl, userData);
      } catch (error) {
        console.log(error);
      }

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        setShowLogin(false);
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    }
  };
  return (
    <div className='absolute z-10 w-full h-full bg-[#00000090] grid rounded-xl disabled:overflow-x-scroll'>
      <form
        onSubmit={onLogin}
        className='place-self-center flex-col gap-6 px-6 py-8 border rounded-e-md rounded-lg bg-emerald-200'>
        <div className=' flex justify-between'>
          <h2 className='font-bold text-3xl text-emerald-600'>
            {currentState}
          </h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=''
            className='p-2 cursor-pointer'
          />
        </div>
        <div className='flex flex-col mt-6 gap-5 p-1 my-4 justify-center'>
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type='text'
              placeholder='Name'
              required
              name='name'
              className='p-2 border-2 border-emerald-500 rounded-md text-center '
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          )}
          <input
            type='email'
            placeholder='Email'
            required
            name='email'
            className='p-2 border-2 border-emerald-500 rounded-md text-center'
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <input
            type='password'
            placeholder='Password'
            required
            name='password'
            className='p-2 border-2 border-emerald-500 rounded-md text-center'
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>

        <div className='flex gap-2 font-bold my-4'>
          <input type='checkbox' required />
          <p>
            By continuing, I agree to the terms of the use and privacy policy.
          </p>
        </div>
        <button
          type='submit'
          className='text-base w-full px-3 py-2 border-2 border-solid bg-emerald-500 border-emerald-800 rounded-xl  hover:bg-emerald-600 hover:text-white'>
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className='mt-4'>
          {currentState === "Sign Up" ? (
            <p className=''>
              Already have an account?{" "}
              <span
                onClick={() => setCurrentState("Login")}
                className='cursor-pointer text-red-500 font-semibold'>
                Click here.
              </span>
            </p>
          ) : (
            <p className=''>
              Don't have an account?{" "}
              <span
                onClick={() => setCurrentState("Sign Up")}
                className='cursor-pointer text-red-500 font-semibold'>
                Create account.
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
