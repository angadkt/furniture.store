import React from 'react'
import Furniture from "../../assets/furniture-web.png";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className=" w-full h-screen flex flex-col items-center">
         <img src={Furniture} alt="&" className="object-cover w-full h-full " /> 
        <button className="z-10 relative bottom-20  w-24 bg-slate-300 rounded-lg p-2 text-black font hover:bg-slate-500 hover:text-white font-semibold "
        onClick={()=>navigate('/category')}>
          Shop Now 
         </button>
      </div>
    </>
  )
}

export default HeroSection
