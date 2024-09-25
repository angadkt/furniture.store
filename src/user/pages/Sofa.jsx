import React, { useContext } from "react";
import { context_page } from "../context/ContextProduct";
import { useNavigate } from "react-router-dom";

const Sofa = () => {
  const navigate = useNavigate(context_page);
  const { products, handleAddToCart } = useContext(context_page);
  let sofaSeating = products.filter(
    (item) => item.category === "Sofa & Seating"
  );
  return (
    <div className="mt-20 ">
      <div>
        <h1 className="p-6 text-2xl font-bold">
          <center>Sofa & Seating</center>
        </h1>
      </div>
      <div className="w-full h-full     flex flex-wrap gap-5 justify-center ">
        {sofaSeating.map((item) => {
          return (
            <div
              className="w-auto h-auto rounded-xl  shadow-2xl bg-white"
              key={item.id}
            >
              <img
                className="w-72 h-72 rounded-xl  p-3  "
                src={item.image}
                alt={item.name}
              />
              <div className="mt-4 ml-4 mb-2">
                <h1 className="text-xl font-semiboldx">{item.name}</h1>
                <h1>
                  {item.price}
                  {console.log("mapped")}
                </h1>
                <div className="flex justify-between">
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
          );
        })}
      </div>
    </div>
  );
};

export default Sofa;
