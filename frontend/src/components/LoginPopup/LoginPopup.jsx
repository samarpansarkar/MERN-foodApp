import React from "react";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = React.useState("Login");
  return (
    <div className='absolute z-10 w-full h-full bg-orange-400 grid rounded-xl'>
      <form className='place-self-center flex-col gap-6 px-6 py-8 border rounded-e-md rounded-lg bg-orange-100'>
        <div className=' flex justify-between'>
          <h2 className='font-bold text-3xl text-orange-600'>{currentState}</h2>
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
              className='p-2 border-2 border-orange-500 rounded-md text-center '
            />
          )}
          <input
            type='email'
            placeholder='Email'
            required
            className='p-2 border-2 border-orange-500 rounded-md text-center'
          />
          <input
            type='password'
            placeholder='Password'
            required
            className='p-2 border-2 border-orange-500 rounded-md text-center'
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
          className='text-base w-full px-3 py-2 border-2 border-solid bg-orange-300 border-orange-500 rounded-xl  hover:bg-orange-600 hover:text-white'>
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className='mt-4'>
          {currentState === "Sign Up" ? (
            <p className=''>
              Already have an account?{" "}
              <span
                onClick={() => setCurrentState("Login")}
                className='cursor-pointer text-orange-600 font-semibold'>
                Click here.
              </span>
            </p>
          ) : (
            <p className=''>
              Don't have an account?{" "}
              <span
                onClick={() => setCurrentState("Sign Up")}
                className='cursor-pointer text-orange-600 font-semibold'>
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
