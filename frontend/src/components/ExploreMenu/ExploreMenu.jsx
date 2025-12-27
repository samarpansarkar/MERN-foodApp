import React from "react";
import { menu_list } from "../../assets/assets";
import MenuSkeleton from "../Skeletons/MenuSkeleton";
import { useSelector } from "react-redux";
import { selectFoodStatus } from "../../redux/slices/foodSlice";

const ExploreMenu = ({ category, setCategory }) => {
  const status = useSelector(selectFoodStatus);
  const loading = status === 'loading';

  return (
    <div className='flex flex-col gap-5' id='explore-menu'>
      {/* Sticky Header Section */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md py-4 -mx-4 px-4 shadow-sm transition-all duration-300">
        <h1 className='text-gray-900 font-medium text-2xl md:text-3xl mb-2'>
          Explore our menu
        </h1>
        <p className='max-w-prose text-gray-500 text-sm md:text-base lg:max-w-[60%]'>
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your craving and elevate your dining experience,
          one delicious meal at a time.
        </p>
      </div>

      {/* Menu List */}
      <div className='flex justify-between items-center gap-8 text-center my-5 overflow-x-auto no-scrollbar scroll-smooth snap-x'>
        {loading
          ? /* Show Skeletons */
          Array(8)
            .fill(0)
            .map((_, index) => <MenuSkeleton key={index} />)
          : /* Show Actual Menu */
          menu_list.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.menu_name ? "All" : item.menu_name
                  )
                }
                className='cursor-pointer flex-shrink-0 snap-center group'
              >
                <div className={`relative p-1 rounded-full transition-all duration-200 ${category === item.menu_name
                  ? "bg-gradient-to-tr from-primary-500 to-primary-600 shadow-md scale-105"
                  : "bg-transparent group-hover:bg-gray-100"
                  }`}>
                  <img
                    className={`w-[7.5vw] min-w-[80px] h-[7.5vw] min-h-[80px] object-cover rounded-full transition-all duration-300 ${category === item.menu_name
                      ? "border-4 border-white"
                      : ""
                      }`}
                    src={item.menu_image}
                    alt={item.menu_name}
                  />
                </div>
                <p className={`mt-3 text-[max(1.4vw,16px)] transition-colors duration-200 ${category === item.menu_name
                  ? "text-primary-600 font-semibold"
                  : "text-gray-500 group-hover:text-gray-900"
                  }`}>
                  {item.menu_name}
                </p>
              </div>
            );
          })}
      </div>
      <hr className='my-2 h-[2px] bg-gray-200 border-none' />
    </div>
  );
};

export default ExploreMenu;
