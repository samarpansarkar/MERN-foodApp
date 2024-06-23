import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext)
    return (
        <div className='m-4 gap-3  text-orange-500 bg-gray-200  rounded-lg hover:bg-gray-400 hover:text-white'>
            <div className=''>
                <img src={image} alt={name} className='hover:scale-110 rounded-t-xl hover:rounded-xl' />
                {!cartItems[id] ?
                    <img onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' className='m-2' />
                    :
                    <div className='m-3 flex gap-4'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='' />
                        <p className='text-center p-1 bg-orange-300 h-auto w-6 rounded-lg'>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt='' />
                    </div>}
            </div>
            <div className='flex flex-col gap-2 px-2 m-2'>
                <div className='flex-cols justify-between '>
                    <p className='font-bold text-xl text-orange-600'>{name}</p>
                    <img src={assets.rating_starts} alt='rating' className='p-1' />
                </div>
                <p className=''>{description}</p>
                <p className='text-center font-extrabold text-xl'>$ {price}</p>
            </div>

        </div>
    )
}

export default FoodItem
