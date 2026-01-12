// import { useState, useEffect, Suspense, lazy } from "react";
// import { Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import HomePage from "./pages/Home/HomePage";
// import ErrorPage from "./ErrorPage";
// import LoginPopup from "./components/LoginPopup/LoginPopup";
// import ToastProvider from "./components/UI/ToastProvider";
// import LoadingSpinner from "./components/UI/LoadingSpinner"; // Ensure this path is correct
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFoodList } from "./redux/slices/foodSlice";
// import { fetchCartData } from "./redux/slices/cartSlice";
// import { selectToken } from "./redux/slices/userSlice";

import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import createAppRouter from "./routing/Router";

// const CartPage = lazy(() => import("./pages/Cart/CartPage"));
// const PlaceOrderPage = lazy(() => import("./pages/PlaceOrder/PlaceOrderPage"));
// const Verify = lazy(() => import("./pages/Verify/Verify"));
// const MyOrders = lazy(() => import("./pages/MyOrders/MyOrders"));
// const ProfilePage = lazy(() => import("./pages/Profile/ProfilePage"));

// const App = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const dispatch = useDispatch();
//   const token = useSelector(selectToken);

//   useEffect(() => {
//     dispatch(fetchFoodList());
//     if (token) {
//       dispatch(fetchCartData(token));
//     }
//   }, [dispatch, token]);

//   return (
//     <>
//       <ToastProvider />
//       {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
//       <div className='app'>
//         <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
//         <Suspense fallback={
//           <div className="min-h-[60vh] flex items-center justify-center">
//             <LoadingSpinner size="lg" />
//           </div>
//         }>
//           <Routes>
//             <Route path='/' element={<HomePage />} />
//             <Route path='/cart' element={<CartPage />} />
//             <Route path='/order' element={<PlaceOrderPage />} />
//             <Route path='/verify-payment' element={<Verify />} />
//             <Route path='/verify-payment' element={<Verify />} />
//             <Route path='/myorders' element={<MyOrders />} />
//             <Route path='/profile' element={<ProfilePage />} />
//             <Route path='*' element={<ErrorPage />} />
//           </Routes>
//         </Suspense>
//       </div>
//     </>
//   );
// };

// export default App;


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createAppRouter(showLogin, setShowLogin, isAuthenticated);

  return <RouterProvider router={router} />;
}

export default App;
