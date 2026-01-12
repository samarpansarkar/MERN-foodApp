import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginPopup from './components/LoginPopup/LoginPopup';
import ToastProvider from './components/UI/ToastProvider';
import LoadingSpinner from './components/UI/LoadingSpinner';

export default function AppLayout({ showLogin, setShowLogin, isAuthenticated }) {
    return (
        <>
            <ToastProvider />
            {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
            <div className='app'>
                <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
                <Suspense fallback={
                    <div className="min-h-[60vh] flex items-center justify-center">
                        <LoadingSpinner size="lg" />
                    </div>
                }>
                    <Outlet context={{ isAuthenticated, setShowLogin }} />
                </Suspense>
            </div>
        </>
    );
}
