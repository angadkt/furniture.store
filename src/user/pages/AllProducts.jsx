import React, { useEffect } from "react";
import { useContext } from "react";
import { context_page } from "../context/ContextProduct";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster} from 'react-hot-toast';
import Footer from "../components/Footer";
import axios from "axios";
import Flag from "../components/pagination/Flag.jsx";


const AllProducts = () => {
  const { products, handleAddToCart } = useContext(context_page);

  // const [search, setSearch] = useState("");
  // const [searchProducts, setSearchProducts] = useState(products);
  
  const [categoriezedProduct, setCategorizedProduct] = useState([]);

  //pagination 
  const [currentPage , setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemtIndex  = lastItemIndex - itemsPerPage
  const currentItems = categoriezedProduct.slice(firstItemtIndex,lastItemIndex)


  useEffect(()=>{
    if(products.length > 0){
      setCategorizedProduct(products)
    }
  },[products])


  useEffect

  const navigate = useNavigate();


  // =============================== onCategoryHandle ===================================


const handleCategory = async (category) => {
  
  if (category === "All Products") {
    setCategorizedProduct(products);
  }
  else{
    try{
      const response = await axios.get('http://localhost:4000/api/getproductscategory', {params:{category}})
      const filteredData = response.data.data
      setCategorizedProduct(filteredData)
    }catch(err){
      console.log(err);
      
    }
    
  }
}




  // ======================== search ==========================================
  
//   useEffect(() => {
//     if (search) {
//       const filteredProducts = categoriezedProduct.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setSearchProducts(filteredProducts);
//   } else {
//     setSearchProducts(categoriezedProduct);
//   }
// }, [search, categoriezedProduct]);


// useEffect(()=>{
//   setCategorizedProduct(products);
//   setSearchProducts(products);
// }, [products])
// ====================================================================

// useEffect(() => {
//   console.log("Updated category products: ", categoriezedProduct);
// }, [categoriezedProduct]);

// Rendering section
if (!products || products.length === 0) {
  return <div>Loading products...</div>;
}

// ================================================
    



  return (
    <div className="mt-20 bg-transparent">
      <div className="w-full h-full   md:px-16 px-8 mt-5 mb-16">
        <div className="w-full flex justify-center">
          <div class="max-w-md mx-auto">
            <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden mt-5 ">
              <div class="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                class="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-customCardColor"
                // onChange={(e) => setSearch(e.target.value)}
                type="search"
                // value={search}
                id="search"
                placeholder="Search something .."
              />
            </div>
          </div>
        </div>
        <div className="w-full h-10 my-5 flex justify-evenly font-semibold   ">
          <button 
          className="focus:border-b focus:border-black"
          onClick={()=>handleCategory("All Products")} >ALL PRODUCTS</button>
          <button 
          className="focus:border-b focus:border-black"
          onClick={()=>handleCategory("Sofa & Seating")}>SOFA & SEATING</button>
          <button 
          className="focus:border-b focus:border-black"
          onClick={()=>handleCategory("Mattresses")}>MATTRESSES</button>
          <button 
          className="focus:border-b focus:border-black"
          onClick={()=>handleCategory("Dining")}>HOME & KITCHEN</button>
          <button 
          className="focus:border-b focus:border-black"
          onClick={()=>handleCategory("Home Kitchen")}>DINING</button>
          <button 
          className="focus:border-b focus:border-black"
          onClick={()=>handleCategory("Lamps & Lighting")}>LAMPS & LIGHTS</button>
        </div>
        <div className="w-full h-full flex justify-center flex-wrap gap-10 ">
          {currentItems.length > 0
            ? currentItems.map((item,index) => (
                <div
                  className="w-auto h-auto rounded-xl  shadow-xl  border bg-white   p-4 "
                  key={index}
                >
                  <div className=" overflow-hidden object-contain relative rounded-xl">
                  <img
                    className="w-72 h-72 object-cover rounded-xl  hover:scale-x-105 hover:scale-105 hover:duration-300"
                    src={item.images[0]}
                    alt={item.name}
                  />
                  </div>
                  <div className="mt-4 ml-4 mb-2">
                    <h1 className="text-xl font-semibold">{item.name}</h1>
                    <h1 className=" font-semibold text-red-500">
                      {item.price}
                    </h1>
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => navigate(`/products/${item.id}`)}
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : currentItems.map((item,index) => (
                <div
                  className="w-auto h-auto rounded-xl  shadow-2xl   object-contain overflow-hidden p-4"
                  key={index}
                >
                  <div className="h-72 w-72 overflow-hidden  object-contain relative rounded-xl">
                  <img
                    className="w-72 h-72 object-cover rounded-xl  hover:scale-x-105 hover:scale-105 hover:duration-300"
                    src={item.images[0]}
                    alt={item.name}
                  />
                  </div>
                  <div className="mt-4 ml-4 mb-2">
                    <h1 className="text-xl font-semibold">{item.name}</h1>
                    <h1 className=" font-semibold text-red-500">
                      {item.price}
                    </h1>
                    <div className="flex justify-between ">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className=" p-1 rounded-md px-2 mt-2 bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => navigate(`/products/${item.id}`)}
                        className=" p-1 rounded-md px-2 mt-2 bg-blue-500 text-white hover:bg-blue-600 mr-4"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      {/* <Pagination totalItems = {categoriezedProduct.length} itemsPerPage={itemsPerPage} /> */}
      {/* <Pagination /> */}
      <Flag totalItems = {categoriezedProduct.length} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} />
      <Toaster />
      <Footer />
    </div>
  );
};

export default AllProducts;
