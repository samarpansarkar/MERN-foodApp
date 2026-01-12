import React, { useEffect, useState } from "react";
import { HiOutlineShoppingBag, HiChevronDown, HiChevronUp } from "react-icons/hi";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Button from "../../components/UI/Button";
import OrderTimeline from "../../components/OrderTimeline/OrderTimeline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from './../../assets/assets';
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/slices/userSlice";
import { BASE_API } from "../../constant";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const token = useSelector(selectToken);
  const url = BASE_API;
  const navigate = useNavigate();

  useEffect(() => {
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

    if (token) {
      fetchData();
    }
  }, [token, url]);

  const toggleOrder = (orderId) => {
    setExpandedOrderId(prev => prev === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center animate-fade-in'>
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className='my-12 animate-fade-in'>
      <h2 className='text-3xl font-bold text-gray-900 mb-8'>My Orders</h2>

      {data.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl shadow-sm border border-gray-100'>
          <div className='bg-primary-50 rounded-full p-6 mb-4 animate-scale-in'>
            <HiOutlineShoppingBag className='text-primary-600 w-16 h-16' />
          </div>
          <h3 className='text-2xl font-semibold text-gray-900 mb-2'>
            No orders yet
          </h3>
          <p className='text-gray-600 mb-6 text-center max-w-md'>
            Looks like you haven&apos;t placed any orders yet. Start exploring our menu!
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Browse Menu
          </Button>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((order, index) => {
            const isExpanded = expandedOrderId === order._id;

            return (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md transition-all duration-300 border border-gray-100 overflow-hidden ${isExpanded ? "ring-2 ring-primary-500 ring-offset-2" : "hover:shadow-lg"
                  }`}
              >
                <div className='p-6'>
                  <div className='flex flex-col md:flex-row md:items-center gap-4'>
                    <div className='flex-shrink-0'>
                      <div className='bg-primary-50 rounded-lg p-3'>
                        <img src={assets.parcel_icon} alt="Order" className='w-12 h-12' />
                      </div>
                    </div>

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

                      <p className='text-gray-700 mb-2 line-clamp-2 text-sm md:text-base'>
                        {order.items.map((item, idx) => {
                          if (idx === order.items.length - 1) {
                            return `${item.name} × ${item.quantity}`;
                          } else {
                            return `${item.name} × ${item.quantity}, `;
                          }
                        })}
                      </p>

                      <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600 font-medium'>
                        <span className='flex items-center gap-1 bg-gray-50 px-2 py-1 rounded'>
                          Items: {order.items.length}
                        </span>
                        <span className='flex items-center gap-1 bg-gray-50 px-2 py-1 rounded'>
                          Total: ${order.amount}.00
                        </span>
                      </div>
                    </div>

                    <div className='flex-shrink-0 mt-4 md:mt-0'>
                      <Button
                        variant={isExpanded ? "primary" : "outline"}
                        size="sm"
                        onClick={() => toggleOrder(order._id)}
                        className="w-full md:w-auto flex items-center justify-center gap-2"
                      >
                        {isExpanded ? "Hide Tracking" : "Track Order"}
                        {isExpanded ? <HiChevronUp /> : <HiChevronDown />}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-gray-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <h4 className="font-semibold text-gray-900 mb-4">Order Status Timeline</h4>
                      <OrderTimeline status={order.status} />

                      <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm text-gray-600 flex justify-between items-center">
                        <span>Estimated Delivery: <strong>30-45 mins</strong></span>
                        {order.status === 'Delivered' && (
                          <span className="text-green-600 font-bold">Successfully Delivered!</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
