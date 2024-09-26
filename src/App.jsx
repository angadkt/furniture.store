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
            {/* <Route path="/sofa" element={<Sofa />} />
            <Route path="/matresses" element={<Matresses />} />
            <Route path="/kitchen" element={<HomeKitchen />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/lampLighting" element={<LampsLighting />} />
            <Route path="/products/:id" element={<ProductDetails />} /> */}
            <Route path="/cart" element={<CartView />} />
          </Route>

          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/paymentDetails" element={<PayForm />} />
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </ContextProduct>
    </div>
  );
}

export default App;
