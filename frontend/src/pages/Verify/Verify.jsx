import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import axios from "axios";
import { BASE_API } from "../../constant";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const url = BASE_API;
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        orderId,
        success,
      });

      if (response.data.success) {
        toast.success("Payment successful! 🎉");
        setTimeout(() => navigate("/myorders"), 1500);
      } else {
        toast.error("Payment failed. Please try again.");
        setTimeout(() => navigate("/cart"), 2000);
      }
    } catch (error) {
      toast.error("Something went wrong. Redirecting...");
      setTimeout(() => navigate("/cart"), 2000);
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
      <div className='bg-white p-8 rounded-2xl shadow-lg max-w-md w-full mx-4 text-center'>
        {verifying ? (
          <>
            <LoadingSpinner size="lg" className="mb-4" />
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Verifying Payment
            </h2>
            <p className='text-gray-600'>
              Please wait while we confirm your payment...
            </p>
          </>
        ) : (
          <>
            <div className='text-6xl mb-4'>
              {success === "true" ? "✅" : "❌"}
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              {success === "true" ? "Payment Confirmed!" : "Payment Failed"}
            </h2>
            <p className='text-gray-600'>Redirecting you...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Verify;
