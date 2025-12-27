import React, { useState, useContext } from 'react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { StoreContext } from '../../context/StoreContext';
import { FiLoader, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';

const FoodDetailsModal = ({ isOpen, onClose, foodItem }) => {
    const { addToCart, url } = useContext(StoreContext);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('Medium');
    const [addons, setAddons] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    if (!foodItem) return null;

    const getPrice = () => {
        let basePrice = foodItem.price;
        if (size === 'Large') basePrice += 2;
        if (size === 'Small') basePrice -= 1;

        const addonsPrice = addons.length * 1.5;
        return (basePrice + addonsPrice) * quantity;
    };

    const handleAddonToggle = (addon) => {
        if (addons.includes(addon)) {
            setAddons(prev => prev.filter(a => a !== addon));
        } else {
            setAddons(prev => [...prev, addon]);
        }
    };

    const handleAddToCart = async () => {
        setIsAdding(true);
        await new Promise(resolve => setTimeout(resolve, 600));

        for (let i = 0; i < quantity; i++) {
            await addToCart(foodItem._id);
        }

        setIsAdding(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={foodItem.name}>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                    <img
                        src={url + "/images/" + foodItem.image}
                        alt={foodItem.name}
                        className="w-full h-64 md:h-full object-cover rounded-xl shadow-md"
                    />
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <p className="text-gray-600">{foodItem.description}</p>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Select Size</h3>
                        <div className="flex gap-2">
                            {['Small', 'Medium', 'Large'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSize(s)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${size === s
                                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Add-ons (+$1.50)</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Extra Cheese', 'Spicy Sauce', 'Garlic Dip'].map((addon) => (
                                <button
                                    key={addon}
                                    onClick={() => handleAddonToggle(addon)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${addons.includes(addon)
                                        ? 'bg-gray-800 text-white border-gray-800'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {addon}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-1">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="p-2 hover:bg-gray-100 rounded-md text-gray-600"
                            >
                                <FiMinus size={14} />
                            </button>
                            <span className="font-semibold w-4 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => Math.min(10, q + 1))}
                                className="p-2 hover:bg-gray-100 rounded-md text-gray-600"
                            >
                                <FiPlus size={14} />
                            </button>
                        </div>

                        <div className="text-xl font-bold text-primary-600">
                            ${getPrice().toFixed(2)}
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        className="w-full py-3 flex items-center justify-center gap-2"
                        onClick={handleAddToCart}
                        disabled={isAdding}
                    >
                        {isAdding ? <FiLoader className="animate-spin" /> : <FiShoppingCart />}
                        {isAdding ? "Adding to Cart..." : "Add to Order"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default FoodDetailsModal;
