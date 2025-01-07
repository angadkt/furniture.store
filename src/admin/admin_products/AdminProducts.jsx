import React, { useContext, useEffect, useState } from "react";
import { context_page } from "../../user/context/ContextProduct";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const apiUrl = import.meta.env.VITE_API_KEY

const AdminProducts = () => {
  const { products, fetchData, deleteProduct, setProducts } =
    useContext(context_page);
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

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(productId)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  // const handleDeleteProduct = (productId) => {
  //   deleteProduct(productId)
  // }
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
      tempImage: "",
      images: [],
      details: "",
      price: "",
      quantity: 1,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      category: Yup.string().required("Category is required"),
      images: Yup.array()
        .of(Yup.string().url("Invalid URL"))
        .min(1, "At least one image URL is required"),
      details: Yup.string().required("Details are required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be positive")
        .required("Price is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // let newId = String(products.length + 1);
      const newProduct = { ...values };
      console.log(newProduct);
      try {
        const response = await axios.post(
          `${apiUrl}/addproducts`,
          newProduct
        );
        console.log(response.data.data);
        toast("producted added to the database");
        setProducts([...products, newProduct]);
        resetForm();
        fetchData()
      } catch (err) {
        console.log(`error occured ${err}`);
      }
      // axios.post(`http://localhost:5999/products`, newProduct)
      //   .then((res) => {
      //     console.log("Product added:", res);
      //     alert('Product added to the database');
      // .catch((err) => {
      //   console.log("Error:", err);
      // });
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
              <form
  onSubmit={formik.handleSubmit}
  className="flex flex-col space-y-6 w-full max-w-lg mx-5 p-6 bg-white rounded-lg shadow-md border border-gray-300 h-auto"
>
  {/* Product Name */}
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

  {/* Category */}
  <div className="flex flex-col">
    <label className="text-gray-700 font-semibold mb-1">Category</label>
    <input
      className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      type="text"
      placeholder="Category"
      {...formik.getFieldProps("category")}
    />
    {/* <select 
    >

    </select> */}
    {formik.touched.category && formik.errors.category ? (
      <div className="text-red-500 text-sm">{formik.errors.category}</div>
    ) : null}
  </div>

  {/* Image URL */}
  <div className="flex flex-col">
    <label className="text-gray-700 font-semibold mb-1">Image URL</label>
    <div className="flex">
      <input
        className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none flex-1"
        type="url"
        placeholder="Enter the image URL"
        value={formik.values.tempImage || ""}
        onChange={(e) => formik.setFieldValue("tempImage", e.target.value)}
      />
      <button
        type="button"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => {
          if (formik.values.tempImage) {
            formik.setFieldValue("images", [
              ...formik.values.images,
              formik.values.tempImage,
            ]);
            formik.setFieldValue("tempImage", ""); // Clear the input field after adding the URL
          }
        }}
      >
        Add
      </button>
    </div>

    {formik.touched.images && formik.errors.images ? (
      <div className="text-red-500 text-sm">{formik.errors.images}</div>
    ) : null}

    {/* Display added image URLs */}
    <ul className="mt-2">
      {formik.values.images.map((url, index) => (
        <li key={index} className="flex items-center justify-between">
          <span className="text-gray-700 text-sm overflow-hidden">{url}</span>
          <button
            type="button"
            className="text-red-500 text-sm"
            onClick={() =>
              formik.setFieldValue(
                "images",
                formik.values.images.filter((_, i) => i !== index)
              )
            }
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  </div>

  {/* Product Details */}
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

  {/* Price */}
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

  {/* Submit Button */}
  <div className="flex justify-center">
    <button
      type="submit"
      className="bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
    >
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
                              src={item.images[0]}
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
                            <button
                              onClick={() =>
                                navigate(`/editproduct/${item._id}`)
                              }
                              className="border px-4 text-white bg-blue-500 hover:bg-blue-600 hover:border-blue-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={()=>handleDelete(item._id)}
                              // onClick={()=>deleteProduct(item._id)}
                              className="border px-4 text-white bg-red-600 hover:bg-red-700 hover:border-red-700"
                            >
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
        <Toaster />
      </div>
    </>
  );
};

export default AdminProducts;
