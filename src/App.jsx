import { Routes, Route } from "react-router-dom";
import "./App.css";
import { FaRadiationAlt } from "react-icons/fa";
import RegistrationForm from "./user/pages/RegistrationForm";
import SignIn from "./user/pages/SignIn";
import Home from "./user/pages/Home";
import Navbar from "./user/components/Navbar";
import Profile from "./user/components/Profile";
import CategorySection from "./user/components/CategorySection";
import AllProducts from "./user/pages/AllProducts";
import ContextProduct from "./user/context/ContextProduct";
import React from "react";
import CartView from "./user/components/CartView";
import PaymentPage from "./user/pages/PaymentPage";
import Footer from "./user/components/Footer";
import PayForm from "./user/pages/PayForm";
import { ToastContainer } from 'react-toastify';
import AdminHome from "./admin/admin_Home/AdminHome";
import ProductDetails from "./user/components/ProductDetails";
import OrderView from "./user/components/order/OrderView"
import EditProduct from "./admin/admin_products/EditProduct";

function App() {
  return (
    <div>
      <ToastContainer position="top-center"/>
      <ContextProduct>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category" element={<CategorySection />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/orders" element={<OrderView />} />
          </Route>

          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/paymentDetails" element={<PayForm />} />
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
        </Routes>
        {/* <Footer /> */}
      </ContextProduct>
    </div>
  );
}

export default App;
