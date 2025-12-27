
import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { FiPlus, FiMinus, FiStar } from "react-icons/fi";
import FoodDetailsModal from "./FoodDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, syncAddToCart, syncRemoveFromCart } from "../../redux/slices/cartSlice";
import { selectToken } from "../../redux/slices/userSlice";
import { BASE_API } from "../../constant";
import { motion } from "framer-motion";

const FoodItem = ({ id, name, price, description, image }) => {
  const cartItems = useSelector(selectCartItems);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const url = BASE_API;
  const quantity = cartItems[id] || 0;

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
      <motion.div
        className='w-full m-auto rounded-[15px] shadow-md transition-shadow duration-300 bg-white animate-fade-in group cursor-pointer h-full flex flex-col'
        onClick={() => setIsModalOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.3 }}
      >
        <div className='relative w-full aspect-[4/3] overflow-hidden rounded-t-[15px]'>
          <motion.img
            className='w-full h-full object-cover transition-transform duration-500'
            src={url + "/images/" + image}
            alt={name}
            whileHover={{ scale: 1.05 }}
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
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
              <FiStar className="text-gray-300" />
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
      </motion.div>
      <FoodDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        foodItem={{ _id: id, name, price, description, image }}
      />
    </>
  );
};

export default FoodItem;
