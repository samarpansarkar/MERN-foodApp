import { useContext, useEffect, useState } from "react";
import "./OrderPage.css";
import axios from 'axios';
import { assets } from '../../assets/assets.js';


const OrderPage = () => {
  const [data, setData] = useState([])
  const url = "http://localhost:4444";
  //!fetch data from backend
  const fetchData = async () => {
    const response = await axios.get(url + "/api/order/list")

    if (response.data.success) {
      setData(response.data.data)
      console.log(response.data.data);
    } else {
      console.log(response.data.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {data.map((order, index) =>
        (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity
                  }
                  else {
                    return item.name + " X " + item.quantity + ", "
                  }
                })}
              </p>
              <p className="order-item-mane">{order.address.firstName + "  " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phoneNumber}</p>
            </div>
            <p>Item: {order.items.length}</p>
            <p>Amount: ${order.amount}</p>
            <select>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        )
        )}
      </div>
    </div>
  );
};

export default OrderPage;
