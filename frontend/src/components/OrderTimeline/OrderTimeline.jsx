import React from 'react';
import { FiPackage, FiCheck, FiTruck, FiHome } from 'react-icons/fi';

const OrderTimeline = ({ status }) => {
    const steps = [
        { label: "Food Processing", icon: FiPackage },
        { label: "Out for delivery", icon: FiTruck },
        { label: "Delivered", icon: FiHome }
    ];

    const getCurrentStep = () => {
        return steps.findIndex(step => step.label === status);
    };

    const currentStep = getCurrentStep();

    return (
        <div className="w-full py-4">
            <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full" />

                <div
                    className="absolute top-1/2 left-0 h-1 bg-green-500 -z-0 -translate-y-1/2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, index) => {
                    const isCompleted = index <= currentStep;
                    const isActive = index === currentStep;
                    const Icon = step.icon;

                    return (
                        <div key={index} className="flex flex-col items-center gap-2 bg-white px-2">
                            <div
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted
                                    ? "bg-green-500 border-green-500 text-white shadow-lg scale-110"
                                    : "bg-white border-gray-300 text-gray-400"
                                    }`}
                            >
                                {isActive ? (
                                    <Icon className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
                                ) : index < currentStep ? (
                                    <FiCheck className="w-6 h-6" />
                                ) : (
                                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                )}
                            </div>
                            <p className={`text-xs md:text-sm font-medium whitespace-nowrap ${isCompleted ? "text-green-600 font-bold" : "text-gray-500"
                                }`}>
                                {step.label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderTimeline;
