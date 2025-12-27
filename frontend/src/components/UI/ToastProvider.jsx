import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#ffffff',
                    color: '#111827',
                    padding: '16px',
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                },
                success: {
                    duration: 3000,
                    iconTheme: {
                        primary: '#10b981',
                        secondary: '#ffffff',
                    },
                    style: {
                        border: '2px solid #10b981',
                    },
                },
                error: {
                    duration: 5000,
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#ffffff',
                    },
                    style: {
                        border: '2px solid #ef4444',
                    },
                },
                loading: {
                    iconTheme: {
                        primary: '#3b82f6',
                        secondary: '#ffffff',
                    },
                },
            }}
        />
    );
};

export default ToastProvider;
