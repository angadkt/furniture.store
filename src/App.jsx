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
import Sofa from "./user/pages/Sofa";
import React from "react";
import Matresses from "./user/pages/Matresses";
import HomeKitchen from "./user/pages/HomeKitchen";
import Dining from "./user/pages/Dining";
import LampsLighting from "./user/pages/LampsLighting";
import ProductDetails from "./user/components/ProductDetails";
import CartView from "./user/components/CartView";
import PaymentPage from "./user/pages/PaymentPage";
import Footer from "./user/components/Footer";

function App() {
  return (
    <div>
      <ContextProduct>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category" element={<CategorySection />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/sofa" element={<Sofa />} />
            <Route path="/matresses" element={<Matresses />} />
            <Route path="/kitchen" element={<HomeKitchen />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/lampLighting" element={<LampsLighting />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Route>

          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </ContextProduct>
    </div>
  );
}

export default App;
