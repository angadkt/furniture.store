import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "./Carousel/ImageCarousel";

const CategorySection = () => {
  const navigate = useNavigate();


  return (
    <div className="w-full h-full mt-10">
      <div className="flex flex-col flex-wrap gap-5">
        <div className="flex flex-wrap gap-5  px-20">
          <div className="flex-1 bg-slate-500">
            <img
              src="https://ii1.pepperfry.com/assets/9b2c9a80-3e2e-499f-8b26-02c53cc0d277.jpg"
              alt="#"
            />
          </div>
          <div className="flex-1 bg-slate-500">
            <img
              src="https://ii1.pepperfry.com/assets/07a3fc10-72e8-421c-ad45-7094dfe7438c.jpg"
              alt="#"
            />
          </div>
          <div className="flex-1 bg-slate-600">
            <img
              src="https://ii1.pepperfry.com/assets/d487a1cb-4933-4140-88b3-3f455e4990e8.jpg"
              alt="#"
            />
          </div>
        </div>
        <div className="">
          <div className="px-20">
            <img
              src="https://ii1.pepperfry.com/assets/bb3983a2-8343-4231-9a7f-5ae11f049219.jpg"
              alt="#"
              className="rounded-"
            />
          </div>
        </div>
        <div>
          <div className="px-20">
            <ImageCarousel />
          </div>
        </div>
        <div className="">
          <div className="px-20 pb-10 ">
            <img
              src="https://ii1.pepperfry.com/assets/f944c567-5813-4809-bcc7-0fa2654a651e.jpg"
              alt="#"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
