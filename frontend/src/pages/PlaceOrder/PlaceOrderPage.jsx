import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { STRIPE_REDIRECT_URL } from "../../../constant";
import './PlaceOrderPage.css'

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
      className='place-order'>
      <div className='place-order-left '>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input
            required
            type='text'
            name='firstName'
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder='First Name'
          />
          <input
            required
            type='text'
            name='lastName'
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder='Last Name'
          />
        </div>
        <input
          required
          type='email'
          name='email'
          onChange={onChangeHandler}
          value={data.email}
          placeholder='Email Address'
        />
        <input
          required
          type='text'
          name='phoneNumber'
          onChange={onChangeHandler}
          value={data.phoneNumber}
          placeholder='Phone Number'
        />
        <div className='multi-fields'>
          <input
            required
            type='text'
            name='street'
            onChange={onChangeHandler}
            value={data.street}
            placeholder='street'
          />
          <input
            required
            type='text'
            name='city'
            onChange={onChangeHandler}
            value={data.city}
            placeholder='city'
          />
        </div>
        <div className='multi-fields'>
          <input
            required
            type='text'
            name='state'
            onChange={onChangeHandler}
            value={data.state}
            placeholder='State'
          />
          <input
            required
            type='text'
            name='zipcode'
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder='Pin Code'
          />
          <input
            required
            type='text'
            name='country'
            onChange={onChangeHandler}
            value={data.country}
            placeholder='Country'
          />
        </div>

      </div>
      <div>
        <div className='place-order-right'>
          <div className='cart-total'>
            <h2>Cart Totals</h2>
            <div>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>$ {getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>$ {2}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <b>Total</b>
                <b>$ {getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type='submit'>
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrderPage;
