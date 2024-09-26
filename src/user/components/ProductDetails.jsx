import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { context_page } from "../context/ContextProduct";
import { FaOpencart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, handleAddToCart } = useContext(context_page);
  const productDetail = products.filter(
    (item) => parseInt(item.id) === parseInt(id)
  );
  return (
    <div>
      <div className="mt-20 flex justify-center items-center">
        {productDetail.map((item) => (
          <div className="shadow-2xl w-3/4 mt-10 p-5 rounded-xl">
            <div className="flex items-center">
              <div className="mr-5">
                <img className="w-[400px]" src={item.image} alt={item.name} />
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-extrabold text-4xl">{item.name}</div>
                <div className="text-slate-400">{item.category}</div>
                <div>{item.details}</div>
                <div>MRP : {item.price}</div>
                {console.log("mapped")}
                <div>
                <button 
              onClick={()=>handleAddToCart(item)}
               className=' p-1 rounded-md px-2 mt-2 bg-blue-500 text-white hover:bg-blue-700 flex'>Add to Cart <FaOpencart size={26}/></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
