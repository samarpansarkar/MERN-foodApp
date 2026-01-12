import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile, addUserAddress, removeUserAddress, selectProfile, selectToken, selectAddresses } from '../../redux/slices/userSlice';
import { FiUser, FiMapPin, FiTrash2, FiPlus, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/UI/Button';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const profile = useSelector(selectProfile);
    const addresses = useSelector(selectAddresses);

    const [isEditing, setIsEditing] = useState(false);
    const [isAddingAddress, setIsAddingAddress] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    });

    const [addressData, setAddressData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        street: '', city: '', state: '', zipcode: '', country: ''
    });

    useEffect(() => {
        if (token && !profile) {
            dispatch(fetchUserProfile(token));
        }
    }, [token, profile, dispatch]);

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                phone: profile.phone || ''
            });
        }
    }, [profile]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const result = await dispatch(updateUserProfile({ token, profileData: { userId: profile._id, ...formData } }));
        if (updateUserProfile.fulfilled.match(result)) {
            setIsEditing(false);
            toast.success("Profile updated successfully");
        } else {
            toast.error(result.payload || "Failed to update profile");
        }
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        const result = await dispatch(addUserAddress({ token, address: addressData }));
        if (addUserAddress.fulfilled.match(result)) {
            setIsAddingAddress(false);
            setAddressData({
                firstName: '', lastName: '', email: '', phone: '',
                street: '', city: '', state: '', zipcode: '', country: ''
            });
            toast.success("Address added successfully");
        } else {
            toast.error(result.payload || "Failed to add address");
        }
    };

    const handleRemoveAddress = async (addressId) => {
        if (window.confirm("Are you sure you want to remove this address?")) {
            const result = await dispatch(removeUserAddress({ token, addressId }));
            if (removeUserAddress.fulfilled.match(result)) {
                toast.success("Address removed successfully");
            } else {
                toast.error(result.payload || "Failed to remove address");
            }
        }
    };

    const handleAddressChange = (e) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    };

    if (!profile) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Personal Details Section */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <FiUser className="text-primary-600" />
                                Details
                            </h2>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-primary-600 hover:bg-primary-50 p-2 rounded-full transition-colors"
                            >
                                {isEditing ? <FiX /> : <FiEdit2 />}
                            </button>
                        </div>

                        <form onSubmit={handleUpdateProfile}>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-primary-500"
                                        />
                                    ) : (
                                        <p className="text-gray-800 font-medium">{profile.name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                                    <p className="text-gray-800 font-medium">{profile.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-primary-500"
                                            placeholder="Add phone number"
                                        />
                                    ) : (
                                        <p className="text-gray-800 font-medium">{profile.phone || 'Not set'}</p>
                                    )}
                                </div>

                                {isEditing && (
                                    <Button type="submit" size="sm" className="w-full mt-4 flex items-center justify-center gap-2">
                                        <FiSave /> Save Changes
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Address Book Section */}
                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <FiMapPin className="text-primary-600" />
                                Address Book
                            </h2>
                            <Button onClick={() => setIsAddingAddress(!isAddingAddress)} size="sm" variant={isAddingAddress ? "outline" : "primary"}>
                                {isAddingAddress ? <><FiX className="mr-1" /> Cancel</> : <><FiPlus className="mr-1" /> Add New</>}
                            </Button>
                        </div>

                        <AnimatePresence>
                            {isAddingAddress && (
                                <motion.form
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    onSubmit={handleAddAddress}
                                    className="bg-gray-50 p-4 rounded-xl mb-6 overflow-hidden"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input required name="firstName" placeholder="First Name" value={addressData.firstName} onChange={handleAddressChange} className="p-2 border rounded" />
                                        <input required name="lastName" placeholder="Last Name" value={addressData.lastName} onChange={handleAddressChange} className="p-2 border rounded" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input required name="email" placeholder="Email" value={addressData.email} onChange={handleAddressChange} className="p-2 border rounded" />
                                        <input required name="phone" placeholder="Phone" value={addressData.phone} onChange={handleAddressChange} className="p-2 border rounded" />
                                    </div>
                                    <div className="mb-4">
                                        <input required name="street" placeholder="Street Address" value={addressData.street} onChange={handleAddressChange} className="w-full p-2 border rounded" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input required name="city" placeholder="City" value={addressData.city} onChange={handleAddressChange} className="p-2 border rounded" />
                                        <input required name="state" placeholder="State" value={addressData.state} onChange={handleAddressChange} className="p-2 border rounded" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input required name="zipcode" placeholder="Zip Code" value={addressData.zipcode} onChange={handleAddressChange} className="p-2 border rounded" />
                                        <input required name="country" placeholder="Country" value={addressData.country} onChange={handleAddressChange} className="p-2 border rounded" />
                                    </div>
                                    <Button type="submit" className="w-full">Save Address</Button>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        <div className="grid grid-cols-1 gap-4">
                            {addresses.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No saved addresses found.</p>
                            ) : (
                                addresses.map((addr) => (
                                    <motion.div
                                        key={addr._id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="border border-gray-200 rounded-xl p-4 flex justify-between items-start hover:shadow-md transition-shadow bg-white"
                                    >
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-gray-800">{addr.firstName} {addr.lastName}</span>
                                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{addr.country}</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{addr.street}</p>
                                            <p className="text-sm text-gray-600">{addr.city}, {addr.state} {addr.zipcode}</p>
                                            <p className="text-sm text-gray-500 mt-2">{addr.phone}</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveAddress(addr._id)}
                                            className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
