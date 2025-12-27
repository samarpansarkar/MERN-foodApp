import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../../constant";

const initialState = {
  foodList: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  searchQuery: "",
  filters: {
    sortBy: "relevant", // relevant, price_low, price_high
    type: "all", // all, veg, non-veg
    priceRange: "all", // all, under_10, 10_20, over_20
  },
};

export const fetchFoodList = createAsyncThunk(
  "food/fetchFoodList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API}/api/food/list`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch food list"
      );
    }
  }
);

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setCategory: (state, action) => {
      // Since we are using a "menu" state for category in ExploreMenu separately,
      // we might just want to update the 'type' filter if it aligns,
      // or we can keep category local to ExploreMenu if it's just for scrolling/highlighting.
      // For now, adhering to the Context logic which seemed to focus on filters.
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFoodList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.foodList = action.payload;
      })
      .addCase(fetchFoodList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, setFilters, setSortBy, setPriceRange } =
  foodSlice.actions;

// Selectors
export const selectAllFood = (state) => state.food.foodList;
export const selectFoodStatus = (state) => state.food.status;
export const selectSearchQuery = (state) => state.food.searchQuery;
export const selectFilters = (state) => state.food.filters;

// Memoized Selector for Filtering (Replaces StoreContext logic)
export const selectFilteredFood = createSelector(
  [selectAllFood, selectSearchQuery, selectFilters],
  (foodList, searchQuery, filters) => {
    if (!Array.isArray(foodList)) return []; // Safety check
    let result = [...foodList];

    // 1. Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    // 2. Type Filter (Placeholder for future)
    if (filters.type !== "all") {
      // Logic for veg/non-veg if data exists
    }

    // 3. Price Range Filter
    if (filters.priceRange !== "all") {
      if (filters.priceRange === "under_10") {
        result = result.filter((item) => item.price < 10);
      } else if (filters.priceRange === "10_20") {
        result = result.filter((item) => item.price >= 10 && item.price <= 20);
      } else if (filters.priceRange === "over_20") {
        result = result.filter((item) => item.price > 20);
      }
    }

    // 4. Sorting
    if (filters.sortBy === "price_low") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price_high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }
);

export default foodSlice.reducer;
