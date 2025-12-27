import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import FoodDetailsModal from "./FoodDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, syncAddToCart, syncRemoveFromCart } from "../../redux/slices/cartSlice";
import { selectToken } from "../../redux/slices/userSlice";
import { BASE_API } from "../../constant";

const FoodItem = ({ id, name, price, description, image }) => {
  const cartItems = useSelector(selectCartItems);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(syncAddToCart({ itemId: id, token }));
  }

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    dispatch(syncRemoveFromCart({ itemId: id, token }));
  }

  return (
    <>
      <div className='w-full m-auto rounded-[15px] shadow-[0px_0px_10px_#00000015] transition duration-300 animate-fade-in hover:shadow-xl group bg-white overflow-hidden flex flex-col'>
        <div className='relative overflow-hidden cursor-pointer' onClick={() => setIsModalOpen(true)}>
          <img
            src={BASE_API + "/images/" + image}
            alt={name}
            className='w-full rounded-t-[15px] hover:scale-105 transition-transform duration-500'
          />

          <div
            className="absolute bottom-4 right-4 flex items-center gap-2 bg-white rounded-full shadow-md p-1"
            onClick={(e) => e.stopPropagation()}
          >
            {!cartItems[id] ? (
              <img
                onClick={() => dispatch(syncAddToCart({ itemId: id, token }))}
                src={assets.add_icon_white}
                alt='Add to cart'
                className='w-9 cursor-pointer hover:opacity-90 transition-opacity'
              />
            ) : (
              <div className='flex items-center gap-2'>
                <img
                  onClick={() => dispatch(syncRemoveFromCart({ itemId: id, token }))}
                  src={assets.remove_icon_red}
                  alt='Remove'
                  className='w-8 cursor-pointer hover:scale-110 transition-transform'
                />
                <p className='font-semibold text-gray-800 min-w-[20px] text-center'>{cartItems[id]}</p>
                <img
                  onClick={() => dispatch(syncAddToCart({ itemId: id, token }))}
                  src={assets.add_icon_green}
                  alt='Add'
                  className='w-8 cursor-pointer hover:scale-110 transition-transform'
                />
              </div>
            )}
          </div>
        </div>

        <div className='p-5 flex flex-col flex-1'>
          <div className='flex justify-between items-center mb-2.5'>
            <p className='text-xl font-medium truncate pr-2'>{name}</p>
            <div className='flex text-amber-400 text-sm'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
              <FaRegStar className="text-gray-300" />
            </div>
          </div>

          <p className='text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]'>
            {description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <p className='text-2xl font-semibold text-primary-600'>${price}</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full hover:bg-primary-100 transition-colors"
            >
              Customize
            </button>
          </div>
        </div>
      </div>

      <FoodDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        foodItem={{ _id: id, name, price, description, image }}
      />
    </>
  );
};

export default FoodItem;
