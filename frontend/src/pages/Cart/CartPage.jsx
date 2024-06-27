import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const CartPage = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  return (
    <div className='mt-24'>
      <div className=''>
        <div className='grid grid-flow-col grid-cols-5 items-center text-lg justify-between'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className='border-black' />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} className='bg-orange-400'>
                <div
                  className='grid grid-flow-col grid-cols-6 items-center text-lg  text-center mx-3 justify-between py-2  '
                  key={index}>
                  <img src={item.image} alt={item.name} className='w-12' />
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>$ {item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => {
                      removeFromCart(item._id);
                    }}
                    className='cursor-pointer'>
                    x
                  </p>
                </div>
                <hr className='border-none h-1 bg-orange-100' />
              </div>
            );
          }
        })}
      </div>
      <div className='mt-20 flex justify-between gap-5'>
        <div className='flex-1 flex flex-col gap-5'>
          <h2>Cart Total</h2>
          <div>
            <div className='flex justify-between p-2'>
              <p>Subtotal</p>
              <p>$ {getTotalCartAmount()}</p>
            </div>
            <hr className='border-none h-1 bg-orange-100' />
            <div className='flex justify-between p-2'>
              <p>Delivery Fee</p>
              <p>$ {2}</p>
            </div>
            <hr className='border-none h-1 bg-orange-100' />
            <div className='flex justify-between p-2'>
              <b>Total</b>
              <b>$ {getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button className='text-base w-fit px-3 py-2 border-2 border-solid bg-orange-300 border-orange-500 rounded-xl  hover:bg-orange-600 hover:text-white'>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className='flex-1'>
          <div>
            <p className='text-orange-500'>
              If you have a promo code, Enter it here
            </p>
            <div className='flex gap-4'>
              <input
                type='text'
                placeholder='Promo Code'
                className='p-2 border-2 border-orange-500 rounded-md text-center'
              />
              <button className='text-base px-3 py-2 border-2 border-solid bg-orange-300 border-orange-500 rounded-xl  hover:bg-orange-600 hover:text-white'>
                APPLY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
