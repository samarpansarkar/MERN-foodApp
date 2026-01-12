import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../../constant";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API}/api/user/profile`, {
        headers: { token },
      });
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching profile"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ token, profileData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_API}/api/user/profile`,
        profileData,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        return profileData;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating profile"
      );
    }
  }
);

export const addUserAddress = createAsyncThunk(
  "user/addAddress",
  async ({ token, address }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_API}/api/user/address/add`,
        { address },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        return response.data.addresses;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding address"
      );
    }
  }
);

export const removeUserAddress = createAsyncThunk(
  "user/removeAddress",
  async ({ token, addressId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_API}/api/user/address/remove`,
        { addressId },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        return addressId;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error removing address"
      );
    }
  }
);

const initialState = {
  token: localStorage.getItem("token") || "",
  profile: null,
  addresses: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
        state.profile = null;
        state.addresses = [];
      }
    },
    logout: (state) => {
      state.token = "";
      state.profile = null;
      state.addresses = [];
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.addresses = action.payload.addresses || [];
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = { ...state.profile, ...action.payload };
      })
      // Add Address
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      // Remove Address
      .addCase(removeUserAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (addr) => addr._id !== action.payload
        );
      });
  },
});

export const { setToken, logout } = userSlice.actions;
export const selectToken = (state) => state.user.token;
export const selectProfile = (state) => state.user.profile;
export const selectAddresses = (state) => state.user.addresses;

export default userSlice.reducer;
