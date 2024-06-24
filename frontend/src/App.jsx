import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import HomePage from "./pages/Home/HomePage"
import ErrorPage from "./ErrorPage"
import CartPage from "./pages/Cart/CartPage"
import PlaceOrderPage from "./pages/PlaceOrder/PlaceOrderPage"
import Footer from "./components/Footer/Footer"
import AppDownload from "./components/AppDownload/AppDownload"
import ExploreMenu from "./components/ExploreMenu/ExploreMenu"

const App = () => {
  return (
    <>
      <div className="w-10/12 m-auto pt-4">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact-us" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<PlaceOrderPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <AppDownload />
      <Footer />
    </>
  )
}

export default App
