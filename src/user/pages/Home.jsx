import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";

const Home = () => {
  return (
    <div className="bg-customLigthPurple w-ful h-full ">
      <HeroSection />
      <CategorySection />
    </div>
  );
};

export default Home;
