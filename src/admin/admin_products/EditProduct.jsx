import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { context_page } from "../../user/context/ContextProduct";
import axios from "axios";
import toast from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_KEY

const EditProduct = () => {
  const { id } = useParams();
  const { products, setProducts, fetchData } = useContext(context_page);
  const navigate = useNavigate();

  const [fltPro, setFltPro] = useState({
    name: "",
    images: [],
    imageInput: "",
    category: "",
    price: "",
    details: "",
    quantity: 1,
  });

  const filteredProduct = products.find((item) => item._id === id);

  useEffect(() => {
    if (filteredProduct) {
      setFltPro(filteredProduct);
    }
  }, [filteredProduct]);

  if (!filteredProduct) {
    return <h1>Product not found</h1>;
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${apiUrl}/editproduct/${id}`,
        fltPro
      );
      toast.success("Product updated successfully");
      fetchData(); // Refresh data in parent
      navigate(-1); // Go back to the previous page
    } catch (err) {
      toast.error("Failed to update product");
      console.error(`Error: ${err}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <form onSubmit={handleEdit} className="">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">ID</label>
            <input
              type="text"
              value={fltPro._id}
              readOnly
              className="border px-4 py-2 rounded-md w-full bg-gray-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Product Name:
            </label>
            <input
              type="text"
              value={fltPro.name}
              onChange={(e) => setFltPro({ ...fltPro, name: e.target.value })}
              placeholder="Enter the product name"
              className="border px-4 py-2 rounded-md w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Category:
            </label>
            <select
              value={fltPro.category}
              onChange={(e) =>
                setFltPro({ ...fltPro, category: e.target.value })
              }
              className="border px-4 py-2 rounded-md w-full"
            >
              <option value="Sofa & Seating">Sofa & Seating</option>
              <option value="Mattresses">Mattresses</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Dining">Dining</option>
              <option value="Lamps & Lighting">Lamps & Lighting</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Details:
            </label>
            <input
              type="text"
              value={fltPro.details}
              onChange={(e) =>
                setFltPro({ ...fltPro, details: e.target.value })
              }
              placeholder="Enter the product details"
              className="border px-4 py-2 rounded-md w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Image URL:
            </label>
            <input
              type="url"
              value={fltPro.imageInput}
              onChange={(e) =>
                setFltPro({ ...fltPro, imageInput: e.target.value })
              }
              placeholder="Enter the image URL"
              className="border px-4 py-2 rounded-md w-full"
            />
            <button
              type="button"
              onClick={() => {
                if (fltPro.imageInput.trim()) {
                  setFltPro({
                    ...fltPro,
                    images: [...fltPro.images, fltPro.imageInput.trim()],
                    imageInput: "",
                  });
                }
              }}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Image
            </button>
          </div>
          <div className="mt-2">
            {fltPro.images.length > 0 && (
              <ul className="list-disc ml-5">
                {fltPro.images.map((image, index) => (
                  <li key={index} className="flex items-center gap-2 ">
                    <span className="overflow-hidden">{image}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFltPro({
                          ...fltPro,
                          images: fltPro.images.filter((_, i) => i !== index), // Remove by index
                        })
                      }
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Price:
            </label>
            <input
              type="number"
              value={fltPro.price}
              onChange={(e) => setFltPro({ ...fltPro, price: e.target.value })}
              placeholder="Enter the price"
              className="border px-4 py-2 rounded-md w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Quantity:
            </label>
            <input
              type="number"
              value={fltPro.quantity}
              readOnly
              className="border px-4 py-2 rounded-md w-full bg-gray-200"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
