import { useSelector } from "react-redux";
import { selectFilteredFood, selectFoodStatus, selectSearchQuery } from "../../redux/slices/foodSlice";
import FilterBar from "../Filters/FilterBar";
import FoodItem from "./FoodItem";
import FoodItemSkeleton from "../Skeletons/FoodItemSkeleton";
import { FiSearch } from "react-icons/fi";

const FoodDisplay = ({ category }) => {
  const filteredFoodList = useSelector(selectFilteredFood);
  const status = useSelector(selectFoodStatus);
  const searchQuery = useSelector(selectSearchQuery);
  const loading = status === 'loading';

  const finalDisplayList = filteredFoodList.filter(item => {
    if (category === "All") return true;
    return item.category === category;
  });

  return (
    <div className='mt-8' id='food-display'>
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
        <h2 className="text-[max(2vw,24px)] font-semibold text-gray-900">
          {searchQuery ? `Results for "${searchQuery}"` : "Top dishes near you"}
        </h2>

        <div className="w-full md:w-auto">
          <FilterBar />
        </div>
      </div>

      <div className='grid grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-3 gap-y-6 md:gap-x-8 md:gap-y-12 animate-slide-up'>
        {loading ? (
          Array(8).fill(0).map((_, index) => <FoodItemSkeleton key={index} />)
        ) : finalDisplayList.length > 0 ? (
          finalDisplayList.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-gray-500">
            <div className="bg-gray-100 p-4 rounded-full mb-3">
              <FiSearch className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">No matches found</h3>
            <p>Try adjusting your search or filters to find what you&apos;re looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
