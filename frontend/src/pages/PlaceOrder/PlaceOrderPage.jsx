import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotalAmount } from "../../redux/slices/cartSlice";
import { selectAllFood } from "../../redux/slices/foodSlice";
import { selectToken } from "../../redux/slices/userSlice";
import { STRIPE_REDIRECT_URL, BASE_API } from "../../constant";


const PlaceOrderPage = () => {
  const cartItems = useSelector(selectCartItems);
  const foodList = useSelector(selectAllFood);
  const token = useSelector(selectToken);
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
    }
  }, [token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col md:flex-row items-start justify-between gap-12 mt-24 animate-fade-in'>
      <div className='w-full max-w-[max(30%,500px)]'>
        <p className='text-3xl font-semibold mb-12'>Delivery Information</p>
        <div className='flex gap-2.5'>
          <input required type='text' name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name' className='mb-4 w-full p-2.5 border border-gray-300 rounded outline-primary-500' />
          <input required type='text' name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' className='mb-4 w-full p-2.5 border border-gray-300 rounded outline-primary-500' />
        </div>
        <input required type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Email Address' className='mb-4 w-full p-2.5 border border-gray-300 rounded outline-primary-500' />
        <input required type='text' name='phoneNumber' onChange={onChangeHandler} value={data.phoneNumber} placeholder='Phone Number' className='mb-4 w-full p-2.5 border border-gray-300 rounded outline-primary-500' />
        <div className='flex gap-2.5'>
          <input required type='text' name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' className='mb-4 w-full p-2.5 border border-gray-300 rounded outline-primary-500' />
          <input required type='text' name='city' onChange={onChangeHandler} value={data.city} placeholder='City' className='mb-4 w-full p-2.5 border border-gray-300 rounded outline-primary-500' />
        </div>
        <div className='flex gap-2.5'>
          <input required type='text' name='state' onChange={onChangeHandler} value={data.state} placeholder='State' className='mb-4 w-full p-2.5 border border-gray-300 rounded outline-primary-500' />
          <input required type='text' name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip Code' className='mb-4 w-full p-2.5 border border-gray-300 rounded outline-primary-500' />
        </div>
        <input required type='text' name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' className='mb-4 w-full p-2.5 border border-gray-300 rounded outline-primary-500' />
      </div>

      <div className='w-full max-w-[max(40%,500px)] mt-8 md:mt-0'>
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
