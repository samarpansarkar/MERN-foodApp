import { useContext } from "react";
import Input from "../../UI/Input";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrderPage = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <form className='flex items-start justify-between gap-12 mt-24'>
      <div className='w-full max-w-[30%, 500px] border '>
        <p className='text-2xl font-bold text-orange-500 mb-10'>
          Delivery Information
        </p>
        <div className='flex-row mb-2'>
          <p className='font-medium'>User Name</p>
          <div className='flex gap-4'>
            <Input type='text' placeholder='First Name' />
            <Input type='text' placeholder='Last Name' />
          </div>
        </div>
        <div className='flex-row'>
          <p className='font-medium'>Email Address</p>
          <Input type='email' placeholder='Email Address' />
          <p>Phone Number</p>
          <Input type='text' placeholder='Phone Number' />
        </div>
        <div className='border border-orange-600 rounded-2xl mt-10 p-2'>
          <div className='flex-row gap-5  '>
            <p className='font-medium'>Delivery Address</p>
            <div className='flex gap-5'>
              <Input type='text' placeholder='street' />
              <Input type='text' placeholder='city' />
              <Input type='text' placeholder='State' />
            </div>
          </div>
          <div className='flex gap-5 mt-5'>
            <Input type='text' placeholder='Pin Code' />
            <Input type='text' placeholder='Country' />
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
              onClick={console.log("PAYMENT")}
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
