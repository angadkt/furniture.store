import React, { useContext, useEffect, useState } from "react";
import { context_page } from "../../user/context/ContextProduct";

const AdminProducts = () => {
  const { products } = useContext(context_page);
  const [productPage, setProductPage] = useState(() => {
    return localStorage.getItem("productPage") || "viewproduct";
  });

  useEffect(() => {
    localStorage.setItem("productPage", productPage);
  }, [productPage]);

  const handleOnPageChange = (str) => {
    setProductPage(str);
  };

  return (
    <>
      <div className="bg-white">
        <h1 className="ml-10 pt-5">Product Details.</h1>
      </div>
      <div className=" h-full w-full mt-10">
        <div className=" flex flex-wrap justify-evenly ">
          <div className=" flex gap-40 ">
            <button
              onClick={() => handleOnPageChange("addproduct")}
              className="font-medium px-4 py-2 focus:bg-cutomBlueAdmin focus:text-white rounded-tl-2xl shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
            >
              ADD PRODUCT
            </button>
            <button
              onClick={() => handleOnPageChange("viewproduct")}
              className=" font-medium px-4 py-2 focus:bg-cutomBlueAdmin focus:text-white rounded-tr-2xl shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
            >
              VIEW PRODUCT
            </button>
          </div>
        </div>
        <div>
          <div></div>
        </div>
        {productPage === "addproduct" ? (
          <>
            <div className="w-full flex justify-center  bg-white py-10">
              <form className="flex flex-col space-y-6 w-full max-w-lg mx-5 p-6 bg-white rounded-lg shadow-md border border-gray-300 h-auto">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold mb-1">
                    Name
                  </label>
                  <input
                    className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    type="text"
                    placeholder="Product name"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold mb-1">
                    Category
                  </label>
                  <input
                    className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    type="text"
                    placeholder="Category"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold mb-1">
                    Image URL
                  </label>
                  <input
                    className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    type="url"
                    placeholder="Enter the URL"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold mb-1">
                    Details
                  </label>
                  <input
                    className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    type="text"
                    placeholder="Enter product details"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold mb-1">
                    Price
                  </label>
                  <input
                    className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    type="number"
                    placeholder="Enter product price"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
                  >
                    Add Now
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          productPage === "viewproduct" && (
            <>
              <div className="h-full w-full ">
                <div className="flex justify-center mt-5">
                  <h1 className="text-2xl font-semibold">Product List</h1>
                </div>
                <div className="flex justify-center my-5 mb-10 ">
                  <table className="w-full mx-20 border-collapse border border-gray-300 ">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Category
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Image
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Details
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((item, index) => (
                        <tr
                          key={index}
                          className="even:bg-gray-100 odd:bg-white"
                        >
                          <td className="border border-gray-300 px-4 py-2">
                            {item.name}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {item.category}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-12 w-12 object-cover rounded-full"
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {item.details}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default AdminProducts;
