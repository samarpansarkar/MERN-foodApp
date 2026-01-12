import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotalAmount } from "../../redux/slices/cartSlice";
import { selectAllFood } from "../../redux/slices/foodSlice";
import { selectToken, fetchUserProfile, selectAddresses } from "../../redux/slices/userSlice";
import { STRIPE_REDIRECT_URL, BASE_API } from "../../constant";


const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const foodList = useSelector(selectAllFood);
  const token = useSelector(selectToken);
  const addresses = useSelector(selectAddresses);
  const totalAmount = useSelector(selectCartTotalAmount);
  const url = BASE_API;

  const getTotalCartAmount = () => totalAmount;
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let orderItems = [];
    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        const itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      redirectUrl: STRIPE_REDIRECT_URL,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    const response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    } else {
      dispatch(fetchUserProfile(token));
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddressSelect = (e) => {
    const addressId = e.target.value;
    if (addressId === "new") {
      setData({
        firstName: "", lastName: "", email: "", phoneNumber: "",
        street: "", city: "", state: "", zipcode: "", country: "",
      });
      return;
    }
    const selected = addresses.find(addr => addr._id === addressId);
    if (selected) {
      setData({
        firstName: selected.firstName,
        lastName: selected.lastName,
        email: selected.email,
        phoneNumber: selected.phone,
        street: selected.street,
        city: selected.city,
        state: selected.state,
        zipcode: selected.zipcode,
        country: selected.country,
      });
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col lg:flex-row items-start justify-between gap-12 mt-12 md:mt-24 animate-fade-in'>
      <div className='w-full lg:max-w-[48%]'>
        <p className='text-2xl md:text-3xl font-semibold mb-8 md:mb-12'>Delivery Information</p>

        {addresses.length > 0 && (
          <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Auto-fill from saved addresses:</label>
            <select
              onChange={handleAddressSelect}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-primary-500"
              defaultValue=""
            >
              <option value="new">-- Enter New Address --</option>
              {addresses.map(addr => (
                <option key={addr._id} value={addr._id}>
                  {addr.firstName} {addr.lastName} - {addr.street}, {addr.city}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <input required type='text' name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name' className='w-full p-3 border border-gray-300 rounded outline-primary-500' />
          <input required type='text' name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' className='w-full p-3 border border-gray-300 rounded outline-primary-500' />
        </div>
        <input required type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Email Address' className='mb-4 w-full p-3 border border-gray-300 rounded outline-primary-500' />
        <input required type='text' name='phoneNumber' onChange={onChangeHandler} value={data.phoneNumber} placeholder='Phone Number' className='mb-4 w-full p-3 border border-gray-300 rounded outline-primary-500' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <input required type='text' name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' className='w-full p-3 border border-gray-300 rounded outline-primary-500' />
          <input required type='text' name='city' onChange={onChangeHandler} value={data.city} placeholder='City' className='w-full p-3 border border-gray-300 rounded outline-primary-500' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <input required type='text' name='state' onChange={onChangeHandler} value={data.state} placeholder='State' className='w-full p-3 border border-gray-300 rounded outline-primary-500' />
          <input required type='text' name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip Code' className='w-full p-3 border border-gray-300 rounded outline-primary-500' />
        </div>
        <input required type='text' name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' className='mb-4 w-full p-3 border border-gray-300 rounded outline-primary-500' />
      </div>

      <div className='w-full lg:max-w-[40%] mt-8 lg:mt-0'>
        <div className='flex flex-col gap-5'>
          <h2 className='text-2xl font-bold'>Cart Totals</h2>
          <div className="flex flex-col gap-2">
            <div className='flex justify-between text-gray-600'>
              <p>Subtotal</p>
              <p>$ {getTotalCartAmount()}</p>
            </div>
            <hr className='my-2 border-gray-200' />
            <div className='flex justify-between text-gray-600'>
              <p>Delivery Fee</p>
              <p>$ {2}</p>
            </div>
            <hr className='my-2 border-gray-200' />
            <div className='flex justify-between text-gray-900 font-bold text-lg'>
              <b>Total</b>
              <b>$ {getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit' className='bg-primary-600 text-white py-3 rounded-md font-semibold hover:bg-primary-700 transition-colors w-full mt-8'>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrderPage;
