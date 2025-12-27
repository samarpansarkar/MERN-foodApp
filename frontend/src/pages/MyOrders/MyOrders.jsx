import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { HiOutlineShoppingBag } from "react-icons/hi";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Button from "../../components/UI/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from './../../assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        url + "/api/order/myorder",
        {},
        { headers: { token } }
      );
      setData(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center'>
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className='my-12 animate-fade-in'>
      <h2 className='text-3xl font-bold text-gray-900 mb-8'>My Orders</h2>

      {data.length === 0 ? (
        /* Empty State */
        <div className='flex flex-col items-center justify-center py-16 px-4'>
          <div className='bg-primary-50 rounded-full p-6 mb-4'>
            <HiOutlineShoppingBag className='text-primary-600 w-16 h-16' />
          </div>
          <h3 className='text-2xl font-semibold text-gray-900 mb-2'>
            No orders yet
          </h3>
          <p className='text-gray-600 mb-6 text-center max-w-md'>
            Looks like you haven't placed any orders yet. Start exploring our menu!
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Browse Menu
          </Button>
        </div>
      ) : (
        /* Orders List */
        <div className='space-y-4'>
          {data.map((order, index) => (
            <div
              key={index}
              className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100'
            >
              <div className='flex flex-col md:flex-row md:items-center gap-4'>
                {/* Order Icon */}
                <div className='flex-shrink-0'>
                  <div className='bg-primary-50 rounded-lg p-3'>
                    <img src={assets.parcel_icon} alt="Order" className='w-12 h-12' />
                  </div>
                </div>

                {/* Order Details */}
                <div className='flex-1 min-w-0'>
                  <div className='flex flex-wrap items-center gap-2 mb-2'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      Order #{order._id?.slice(-6)}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Out for delivery'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      ⬤ {order.status}
                    </span>
                  </div>

                  <p className='text-gray-700 mb-2 line-clamp-2'>
                    {order.items.map((item, idx) => {
                      if (idx === order.items.length - 1) {
                        return `${item.name} × ${item.quantity}`;
                      } else {
                        return `${item.name} × ${item.quantity}, `;
                      }
                    })}
                  </p>

                  <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600'>
                    <span className='flex items-center gap-1'>
                      <strong>Items:</strong> {order.items.length}
                    </span>
                    <span className='flex items-center gap-1'>
                      <strong>Total:</strong> ${order.amount}.00
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className='flex-shrink-0'>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchData}
                  >
                    Track Order
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
