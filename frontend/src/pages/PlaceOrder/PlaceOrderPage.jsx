import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { STRIPE_REDIRECT_URL } from "../../../constant";

const PlaceOrderPage = () => {
  const { getTotalCartAmount, token, foodList, cartItems, url } =
    useContext(StoreContext);
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
    console.log("Sending order data:", orderData); //! Debug: Check if orderData is correctly populated
    //! backend connection
    const response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });

    if (response.data.success) {
      alert("Order placed successfully this");
      const { session_url } = response.data;
      window.location.replace(session_url);
      // navigate('/myorders')
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
    }
  }, [token])
  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex items-start justify-between gap-12 mt-24'>
      <div className='w-full max-w-[30%, 500px] border '>
        <p className='text-2xl font-bold text-orange-500 mb-10'>
          Delivery Information
        </p>
        <div className='flex-row mb-2'>
          <p className='font-medium'>User Name</p>
          <div className='flex gap-4'>
            <input
              required
              type='text'
              name='firstName'
              onChange={onChangeHandler}
              value={data.firstName}
              placeholder='First Name'
              className='p-2 border-2 border-orange-500 rounded-md text-center'
            />
            <input
              required
              type='text'
              name='lastName'
              onChange={onChangeHandler}
              value={data.lastName}
              placeholder='Last Name'
              className='p-2 border-2 border-orange-500 rounded-md text-center'
            />
          </div>
        </div>
        <div className='flex-row'>
          <p className='font-medium'>Email Address</p>
          <input
            required
            type='email'
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            placeholder='Email Address'
            className='p-2 border-2 border-orange-500 rounded-md text-center'
          />
          <p>Phone Number</p>
          <input
            required
            type='text'
            name='phoneNumber'
            onChange={onChangeHandler}
            value={data.phoneNumber}
            placeholder='Phone Number'
            className='p-2 border-2 border-orange-500 rounded-md text-center'
          />
        </div>
        <div className='border border-orange-600 rounded-2xl mt-10 p-2'>
          <div className='flex-row gap-5  '>
            <p className='font-medium'>Delivery Address</p>
            <div className='flex gap-5'>
              <input
                required
                type='text'
                name='street'
                onChange={onChangeHandler}
                value={data.street}
                placeholder='street'
                className='p-2 border-2 border-orange-500 rounded-md text-center'
              />
              <input
                required
                type='text'
                name='city'
                onChange={onChangeHandler}
                value={data.city}
                placeholder='city'
                className='p-2 border-2 border-orange-500 rounded-md text-center'
              />
              <input
                required
                type='text'
                name='state'
                onChange={onChangeHandler}
                value={data.state}
                placeholder='State'
                className='p-2 border-2 border-orange-500 rounded-md text-center'
              />
            </div>
          </div>
          <div className='flex gap-5 mt-5'>
            <input
              required
              type='text'
              name='zipcode'
              onChange={onChangeHandler}
              value={data.zipcode}
              placeholder='Pin Code'
              className='p-2 border-2 border-orange-500 rounded-md text-center'
            />
            <input
              required
              type='text'
              name='country'
              onChange={onChangeHandler}
              value={data.country}
              placeholder='Country'
              className='p-2 border-2 border-orange-500 rounded-md text-center'
            />
          </div>
        </div>
      </div>
      <div>
        <div className='mt-20 flex justify-between gap-5'>
          <div className='flex-1 flex flex-col gap-5'>
            <h2 className='font-bold text-2xl'>Cart Totals</h2>
            <div>
              <div className='flex justify-between p-2'>
                <p>Subtotal</p>
                <p>$ {getTotalCartAmount()}</p>
              </div>
              <hr className='border-none h-1 bg-orange-100' />
              <div className='flex justify-between p-2'>
                <p>Delivery Fee</p>
                <p>$ {2}</p>
              </div>
              <hr className='border-none h-1 bg-orange-100' />
              <div className='flex justify-between p-2'>
                <b>Total</b>
                <b>$ {getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button
              type='submit'
              className='text-base w-fit px-3 py-2 border-2 border-solid bg-orange-300 border-orange-500 rounded-xl  hover:bg-orange-600 hover:text-white'>
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrderPage;
