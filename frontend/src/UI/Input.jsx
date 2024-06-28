import React, { Children } from "react";

const Input = ({ type, placeholder, props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className='p-2 border-2 border-orange-500 rounded-md text-center'
    />
  );
};

export default Input;
