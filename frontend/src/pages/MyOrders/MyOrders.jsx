import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  //!Fetch data from api
  const fetchData = async () => {
    const response = await axios.post(
      url + "/api/order/myorder",
      {},
      {
        headers: { token },
      }
    );

    setData(response.data.data);
    console.log(response.data.data, data);
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);
  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
    </div>
  );
};

export default MyOrders;
