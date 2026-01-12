import { createBrowserRouter } from "react-router-dom";
import { lazy } from 'react';
import HomePage from "../pages/Home/HomePage";
import AppLayout from "../AppLayout";
import ErrorPage from "../ErrorPage";
import ProtectedRoute from "../utils/ProtectedRoute";
const CartPage = lazy(() => import("../pages/Cart/CartPage"));
const PlaceOrderPage = lazy(() => import("../pages/PlaceOrder/PlaceOrderPage"));
const Verify = lazy(() => import("../pages/Verify/Verify"));
const MyOrders = lazy(() => import("../pages/MyOrders/MyOrders"));
const ProfilePage = lazy(() => import("../pages/Profile/ProfilePage"));


const createAppRouter = (showLogin, setShowLogin, isAuthenticated) => createBrowserRouter([
    {
        path: "/",
        element: <AppLayout showLogin={showLogin} setShowLogin={setShowLogin} isAuthenticated={isAuthenticated} />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "order",
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} setShowLogin={setShowLogin}>
                        <PlaceOrderPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "verify-payment",
                element: <Verify />,
            },
            {
                path: "myorders",
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} setShowLogin={setShowLogin}>
                        <MyOrders />
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} setShowLogin={setShowLogin}>
                        <ProfilePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
]);

export default createAppRouter;