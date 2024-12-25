  import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { context_page } from "../../user/context/ContextProduct";
import axios from "axios";

const EditProduct = () => {  
    const { id } = useParams();
    const { products ,setProducts } = useContext(context_page);
    const navigate = useNavigate()
    const [fltPro, setFltPro] = useState({
        id: '',
        name: '',
        image: '',
        category:'',
        price: '',
        details: '',
        quantity: ''
    });


    // const filteredProduct = products.filter((item)=> item.id === id);
    // if(filteredProduct.length === 0){
    //     return <h1>Product not found</h1>
    // }
    // const currentProduct = filteredProduct[0];
    const filteredProduct = products.find((item) => item.id === id);

    useEffect(() => {
      if (filteredProduct) {
        setFltPro(filteredProduct);
      }
    }, [filteredProduct]);


    if (!filteredProduct) {
      return <h1>Product not found</h1>;
    }

    

    // ==========================================================


    const handleEdit = (e)=>{
        e.preventDefault()
        axios.patch(`http://localhost:5999/products/${id}`,fltPro)
        .then((res)=>{
          setProducts((prev)=>(
            prev.map((item)=>(
              item.id === id? {...item, ...fltPro} : item
            ))
          ))
        })
        .catch((err)=>{console.log(err)})  
        navigate(-1) 
    }

  // Fetch product details using the id and update the state with the fetched data
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100"> 
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <form  onSubmit={handleEdit}
        className="">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">ID</label>
            <input
              type="text"
              value={fltPro.id}
              onChange={(e)=>setFltPro({...fltPro, id: e.target.value})}
              placeholder="Enter the product ID"
              className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Product Name:</label>
            <input
              type="text"
              name="name"
              value={fltPro.name}
              onChange={(e)=>setFltPro({...fltPro, name: e.target.value})}
            //   ivide kodukkunna value um change akkunna value yum same avanam bakhi vtl chennit nokkam
              placeholder="Enter the product name"
              className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Product Category:</label>
            <select
            onChange={(e)=>setFltPro({...fltPro, category: e.target.value})}
            value={fltPro.category}
              className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {/* <option value="" disabled selected>Select a category</option> */}
              <option value="Sofa & Seating">Sofa & Seating</option>
              <option value="Mattresses">Mattresses</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Dining">Dining</option>
              <option value="Lamps & Lighting">Lamps & Lighting</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Details:</label>
            <input
              type="text"
              value={fltPro.details}
              onChange={(e)=>setFltPro({...fltPro, details: e.target.value})}
              placeholder="Enter the product details"
              className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Image URL:</label>
            <input
            value={fltPro.image}
            onChange={(e)=>setFltPro({...fltPro, image: e.target.value})}
              type="url"
              placeholder="Enter the image URL"
              className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Price:</label>
            <input
            value={fltPro.price}
            onChange={(e)=>setFltPro({...fltPro, price: e.target.value})}
              type="number"
              placeholder="Enter the price"
              className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Quantity:</label>
            <input
            value={fltPro.quantity}
            onChange={(e)=>setFltPro({...fltPro, quantity: e.target.value})}
              type="number"
              placeholder="Enter the quantity"
              className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
