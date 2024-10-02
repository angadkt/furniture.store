import React, { useContext, useEffect, useState } from "react";
import { context_page } from "../../user/context/ContextProduct";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";




const AdminProducts = () => {
  const { products, handleDeleteProduct , setProducts } = useContext(context_page);
  const [productPage, setProductPage] = useState(() => {
    return localStorage.getItem("productPage") || "viewproduct";
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("productPage", productPage);
  }, [productPage]);

  const handleOnPageChange = (str) => {
    setProductPage(str);
  };

  // ==================  =====================================



//   const [newProducts , setNewProducts] = useState({
//     id: "",
//     name: "",
//     category: "",
//     details: "",
//     price: 0,
//     quantity : 1
//   })

//   let isSubmitting = false;

// const handleAddProducts = (event) => {
//   event.preventDefault();

//   if (isSubmitting) return; // Prevent duplicate submissions
//   isSubmitting = true;      // Set flag to prevent multiple submissions

//   let newId = products.length + 1;

//   setNewProducts((prevState) => {
//     const updateProduct = { ...prevState, id: newId };

//     axios.post(`http://localhost:5999/products`, updateProduct)
//       .then((res) => {
//         console.log(`res: ${res.data}`);
//         console.log('up',updateProduct);
        
//         alert('Product added to the database');
//         isSubmitting = false;  // Reset flag after submission is successful
//       })
//       .catch((err) => {
//         console.log('Error:', err);
//         isSubmitting = false;  // Reset flag even if there's an error
//       });
    
//     return updateProduct;
//   });
// };

  // ======================= form validation ================================

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      image: "",
      details: "",
      price: "",
      quantity : 1,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      category: Yup.string().required("Category is required"),
      image: Yup.string().url("Invalid URL").required("Image URL is required"),
      details: Yup.string().required("Details are required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be positive")
        .required("Price is required"),
    }),
    onSubmit: (values, {resetForm}) => {
      let newId = String(products.length + 1);
      const newProduct = { ...values, id: newId };

      axios.post(`http://localhost:5999/products`, newProduct)
        .then((res) => {
          console.log("Product added:", res);
          alert('Product added to the database');
          setProducts([...products, newProduct])

          resetForm()
        })
        .catch((err) => {
          console.log("Error:", err);
        });
      setProducts([...products, newProduct]);
    },
  });
// ========================================================



 
 

  return (
    <>
      <div className="bg-white">
        <h1 className="ml-10 pt-5 text-cutomBlueAdmin font-bold text-2xl  ">
          Product Details.
        </h1>
      </div>
      <div className=" h-screen w-full mt-10 ">
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

              {/* =============================================== */}
              <form onSubmit={formik.handleSubmit}
      className="flex flex-col space-y-6 w-full max-w-lg mx-5 p-6 bg-white rounded-lg shadow-md border border-gray-300 h-auto">
      
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold mb-1">Name</label>
        <input
          className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          placeholder="Product name"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold mb-1">Category</label>
        <input
          className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          placeholder="Category"
          {...formik.getFieldProps("category")}
        />
        {formik.touched.category && formik.errors.category ? (
          <div className="text-red-500 text-sm">{formik.errors.category}</div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold mb-1">Image URL</label>
        <input
          className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          type="url"
          placeholder="Enter the URL"
          {...formik.getFieldProps("image")}
        />
        {formik.touched.image && formik.errors.image ? (
          <div className="text-red-500 text-sm">{formik.errors.image}</div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold mb-1">Details</label>
        <input
          className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          placeholder="Enter product details"
          {...formik.getFieldProps("details")}
        />
        {formik.touched.details && formik.errors.details ? (
          <div className="text-red-500 text-sm">{formik.errors.details}</div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold mb-1">Price</label>
        <input
          className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          type="number"
          placeholder="Enter product price"
          {...formik.getFieldProps("price")}
        />
        {formik.touched.price && formik.errors.price ? (
          <div className="text-red-500 text-sm">{formik.errors.price}</div>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300">
          Add Now
        </button>
      </div>

    </form>
                {/* ========================================== */}
            </div>
          </>
        ) : (
          productPage === "viewproduct" && (
            <>
              <div className="h-screen w-full overflow-scroll overflow-x-hidden scrollbar-none  ">
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
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          More
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
                          <td className="border border-gray-300 px-4 py-2 flex gap-2 flex-col">
                            <button onClick={()=>navigate(`/editproduct/${item.id}`)}
                            className="border px-4 text-white bg-blue-500 hover:bg-blue-600 hover:border-blue-600">
                              Edit
                            </button>
                            <button
                            onClick={()=>handleDeleteProduct(item)}
                             className="border px-4 text-white bg-red-600 hover:bg-red-700 hover:border-red-700">
                              Delete
                            </button>
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
