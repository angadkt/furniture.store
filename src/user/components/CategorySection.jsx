import axios from "axios";
import { div } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




const CategorySection = () => {
    const navigate = useNavigate();

    const [Categories , setCategories] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:5999/categories');
                setCategories(response.data);
            }catch(err){
                console.log("error getting category");
                
            }
        }
        fetchData();

    },[])
  return (
    // <div className="container  my-14 py-8 "
    // id="category">
    //   <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    //     {Categories.map((category) => (
    //       <div key={category.id} onClick={()=>navigate(category.link)} className="bg-white shadow-lg rounded-lg p-4 object-fill">
    //         <img
    //           src={category.image}
    //           alt={category.name}
    //           className="w-full h-48 object-cover rounded-lg mb-4"
    //         />
    //         <h2 className="text-lg font-semibold text-center">{category.name}</h2>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="flex justify-center mt-20 flex-col items-center mx-16 gap-10 ">
      <div className="font-bold text-4xl">categories</div>
      <div className="flex flex-wrap gap-8 justify-center ">
        {
          Categories.map((item)=>(
            <div className="  p-5 rounded-xl shadow-2xl bg-white" key={item.id} onClick={()=>navigate(item.link)}>
              <img className="w-72 h-80 rounded-xl" src={item.image} alt={item.name} />
              <div className="font-semibold mt-5"><center>{item.name}</center></div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default CategorySection;
