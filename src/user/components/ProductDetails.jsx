import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { context_page } from "../context/ContextProduct";
import { FaOpencart } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(context_page);
  const [ filteredProduct, setFilteredProduct] = useState([])
  const [productsById , setProductsById] = useState([])
 
  // const fetchUserById = async () => {
  //   try{
  //     const response = await axios.get(`http://localhost:4000/api/productsbyid/${id}`)
  //     console.log(response.data.data)
  //     setProductsById(response.data.data)
  //     // console.log(productsById)
  //   }
  //   catch(err){
  //     console.log("error found" , err);
  //   }
  // }

  // useEffect(()=>{
  //   fetchUserById()
  // },[])
  console.log("products",products)

  
  useEffect(()=>{
    const productDetail = products.filter(
      (item) => item._id === id
    );
    setFilteredProduct(productDetail)
  },[id , products])

  console.log("details",filteredProduct);
  
  
  return (
    <div>
      <div className="mt-20 flex justify-center items-center">
        {filteredProduct.map((item) => (
          <div className="shadow-2xl w-3/4 mt-10 p-5 rounded-xl">
            <div className="flex items-center">
              <div className="mr-5">
                <img className="w-[400px]" src={item.images[0]} alt={item.name} />
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-extrabold text-4xl">{item.name}</div>
                <div className="text-slate-400">{item.category}</div>
                <div>{item.details}</div>
                <div>MRP : {item.price}</div>
                {console.log("mapped")}
                <div>
                <button 
              onClick={()=>addToCart(item._id, item.quantity)}
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
    