import React from "react";
import { FiFilter, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters, setSortBy, setPriceRange } from "../../redux/slices/foodSlice";

const FilterBar = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);

    const handleSortChange = (value) => {
        dispatch(setSortBy(value));
    };

    const handlePriceChange = (value) => {
        const newRange = filters.priceRange === value ? "all" : value;
        dispatch(setPriceRange(newRange));
    };

    return (
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 mb-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mr-2">
                <FiFilter /> Filters:
            </div>

            {/* Sort Options */}
            <button
                onClick={() => handleSortChange("relevant")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${filters.sortBy === "relevant"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
            >
                Relevance
            </button>

            <button
                onClick={() => handleSortChange("price_low")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border flex items-center gap-1 ${filters.sortBy === "price_low"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
            >
                Price <FiArrowUp className="w-3 h-3" />
            </button>

            <button
                onClick={() => handleSortChange("price_high")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border flex items-center gap-1 ${filters.sortBy === "price_high"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
            >
                Price <FiArrowDown className="w-3 h-3" />
            </button>

            <div className="w-px h-6 bg-gray-200 mx-1"></div>

            {/* Price Range */}
            <button
                onClick={() => handlePriceChange("under_10")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${filters.priceRange === "under_10"
                    ? "bg-primary-50 text-primary-700 border-primary-200"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
            >
                Under $10
            </button>

            <button
                onClick={() => handlePriceChange("10_20")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${filters.priceRange === "10_20"
                    ? "bg-primary-50 text-primary-700 border-primary-200"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
            >
                $10 - $20
            </button>

            <button
                onClick={() => handlePriceChange("over_20")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${filters.priceRange === "over_20"
                    ? "bg-primary-50 text-primary-700 border-primary-200"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
            >
                $20+
            </button>
        </div>
    );
};

export default FilterBar;
