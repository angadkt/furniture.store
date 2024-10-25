import React from "react";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-customLigthPurple w-ful h-full ">
      <HeroSection />
      <CategorySection />
      <Footer />
    </div>
  );
};

export default Home;
