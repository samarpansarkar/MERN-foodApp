import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../../constant";

const initialState = {
  items: {},
  loading: false,
  error: null,
};

export const syncAddToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ itemId, token }, { rejectWithValue }) => {
    try {
      if (token) {
        await axios.post(
          `${BASE_API}/api/user/cart/add`,
          { itemId },
          { headers: { token } }
        );
      }
      return itemId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

export const syncRemoveFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ itemId, token }, { rejectWithValue }) => {
    try {
      if (token) {
        await axios.post(
          `${BASE_API}/api/user/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      }
      return itemId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from cart"
      );
    }
  }
);

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_API}/api/user/cart/cartData`,
        {},
        { headers: { token } }
      );
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.items = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(syncAddToCart.fulfilled, (state, action) => {
        const itemId = action.payload;
        if (!state.items[itemId]) {
          state.items[itemId] = 1;
        } else {
          state.items[itemId] += 1;
        }
      })
      // Remove
      .addCase(syncRemoveFromCart.fulfilled, (state, action) => {
        const itemId = action.payload;
        if (state.items[itemId] > 0) {
          state.items[itemId] -= 1;
        }
      })
      // Fetch
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => {
  const items = state.cart.items;
  const foodList = state.food.foodList;
  let totalAmount = 0;
  for (const item in items) {
    if (items[item] > 0) {
      const itemInfo = foodList.find((product) => product._id === item);
      if (itemInfo) {
        totalAmount += itemInfo.price * items[item];
      }
    }
  }
  return totalAmount;
};
export const selectCartItemCount = (state) =>
  Object.values(state.cart.items || {}).reduce((acc, qty) => acc + qty, 0);

export default cartSlice.reducer;
