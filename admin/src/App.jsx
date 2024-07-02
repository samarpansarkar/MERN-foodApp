import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AddPage from "./pages/Add/AddPage";
import ListPage from "./pages/List/ListPage";
import OrderPage from "./pages/Orders/OrderPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path='/add' element={<AddPage />} />
          <Route path='/list' element={<ListPage />} />
          <Route path='/orders' element={<OrderPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
