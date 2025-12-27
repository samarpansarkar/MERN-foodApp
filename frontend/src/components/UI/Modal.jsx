import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, children, className = "" }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            <div
                ref={modalRef}
                className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in flex flex-col ${className}`}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-between p-4 md:p-6 border-b sticky top-0 bg-white z-10">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 line-clamp-1">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                <div className="p-4 md:p-6 flex-1">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
