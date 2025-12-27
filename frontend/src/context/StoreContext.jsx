import { createContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { BASE_API } from "../../constant";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = BASE_API;
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    sortBy: "relevant",
    type: "all",
    priceRange: "all"
  });

  const filteredFoodList = useMemo(() => {
    let result = [...foodList];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    if (filters.type !== 'all') {

    }

    if (filters.priceRange !== 'all') {
      if (filters.priceRange === 'under_10') {
        result = result.filter(item => item.price < 10);
      } else if (filters.priceRange === '10_20') {
        result = result.filter(item => item.price >= 10 && item.price <= 20);
      } else if (filters.priceRange === 'over_20') {
        result = result.filter(item => item.price > 20);
      }
    }

    if (filters.sortBy === 'price_low') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [foodList, searchQuery, filters]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "/api/user/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/user/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/user/cart/cartData",
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cart);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    foodList,
    filteredFoodList,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    loading,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
