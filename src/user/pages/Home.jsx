import React from "react";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <div className="bg-customLigthPurple w-ful h-full ">
      <HeroSection />
      <CategorySection />
    </div>
  );
};

export default Home;
