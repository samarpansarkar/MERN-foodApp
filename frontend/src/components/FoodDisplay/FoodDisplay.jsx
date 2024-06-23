import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from './FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext)
    return (
        <div className='mt-8' id='food-display'>
            <h2 className='font-bold text-2xl mb-6 text-orange-500'>Top dishes near you.</h2>
            <div className='grid grid-flow-row-dense grid-cols-5 bg-orange-500 justify-between'>
                {food_list.map((item) => {
                    if (category === "All" || category === item.category) {
                        return <FoodItem key={item._id} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    }

                })}
            </div>
        </div>
    )
}

export default FoodDisplay
