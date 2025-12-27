import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotalAmount, syncRemoveFromCart } from "../../redux/slices/cartSlice";
import { selectAllFood } from "../../redux/slices/foodSlice";
import { selectToken } from "../../redux/slices/userSlice";
import { BASE_API } from "../../constant";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const foodList = useSelector(selectAllFood);
  const token = useSelector(selectToken);
  const totalAmount = useSelector(selectCartTotalAmount);
  const url = BASE_API;

  const removeFromCart = (itemId) => {
    dispatch(syncRemoveFromCart({ itemId, token }));
  };

  const getTotalCartAmount = () => totalAmount;
  return (
    <div className='mt-24 animate-fade-in'>
      <div className='mb-12'>
        <div className='grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-[max(1vw,12px)] mb-4'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr className='h-px bg-gray-200 border-none' />
        {foodList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className='grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-900 my-4 text-[max(1vw,12px)]'>
                  <img src={url + "/images/" + item.image} alt={item.name} className='w-[50px] rounded-lg' />
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>$ {item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => {
                      removeFromCart(item._id);
                    }}
                    className='cursor-pointer text-red-500 hover:text-red-700 font-bold'>
                    x
                  </p>
                </div>
                <hr className='h-px bg-gray-200 border-none' />
              </div>
            );
          }
        })}
      </div>
      <div className='flex flex-col-reverse md:flex-row justify-between gap-[max(12vw,20px)] mt-20'>
        <div className='flex-1 flex flex-col gap-5'>
          <h2 className='text-2xl font-bold'>Cart Total</h2>
          <div className="flex flex-col gap-2">
            <div className='flex justify-between text-gray-600'>
              <p>Subtotal</p>
              <p>$ {getTotalCartAmount()}</p>
            </div>
            <hr className='my-2 border-gray-200' />
            <div className='flex justify-between text-gray-600'>
              <p>Delivery Fee</p>
              <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr className='my-2 border-gray-200' />
            <div className='flex justify-between text-gray-900 font-bold text-lg'>
              <b>Total</b>
              <b>
                $ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button
            onClick={() => navigate("/order")}
            className='bg-primary-600 text-white py-3 rounded-md font-semibold hover:bg-primary-700 transition-colors w-full md:w-[max(15vw,200px)]'
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className='flex-1 justify-start'>
          <div>
            <p className='text-gray-600 mb-2'>If you have a promo code, Enter it here</p>
            <div className='flex justify-between items-center bg-gray-100 rounded-md pl-3'>
              <input type='text' placeholder='Promo Code' className='bg-transparent border-none outline-none w-full py-2' />
              <button className='bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors'>APPLY</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
