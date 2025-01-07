import React, { useContext, useEffect, useState } from "react";
import { context_page } from "../context/ContextProduct";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { h1 } from "framer-motion/client";
import AddressModal from "./Modal/AddressModal";

const CartView = () => {
 
  const {
    cart,
    setQuantity,
    handleIncrement,
    handleDecreament,
    deleteCartItem,
    setCart,
    users,
    getCart,
  } = useContext(context_page);
  const navigate = useNavigate();

  const userId = localStorage.getItem("id");
  const user = users?.find((item) => item._id === userId) || {};
  console.log("users", user);

 

  const cartProducts = cart.map((x) => x.productsId);
  console.log("checking!!", cartProducts);

  const totalAmount = cart.reduce(
    (acc, cur) => acc + cur.quantity * cur.productsId.price,
    0
  );
  console.log("total quantity", totalAmount);

  if (!cartProducts) {
    return (
      <div className="flex justify-center items-center">
        Loading...........................
      </div>
    );
  }


  return (
    <div className="mt-20 flex flex-col flex-wrap gap-5 ">
      {cartProducts.map((item, i) => (
        <div
          key={item._id}
          className=" mx-20 p-4 rounded-xl hover:shadow-xl border-2 border-yellow-100 flex-wrap flex gap-4 "
        >
          <div>
            <img
              className="w-20 h-20 rounded-md "
              src={item.images[0]}
              alt={item.name}
            />
          </div>
          <div>
            <h1>{item.name}</h1>
            <h1>
              MRP : ₹ <span className="font-medium">{item.price} /-</span>
            </h1>
            <button
              onClick={() => deleteCartItem(item._id)}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800   font-medium rounded-lg text-sm px-4 py-1 text-center me-2 mb-2 mt-5"
            >
              Remove
            </button>
          </div>
          <div>
            <span>Qty: &nbsp;</span>
            <button
              onClick={() => handleIncrement(item._id)}
              className="rounded-lg border-4 px-2"
            >
              +
            </button>
            <span className="m-2 ">{cart[i].quantity}</span>
            <button
              className="rounded-lg border-4 px-2 hover:border-black"
              onClick={() => handleDecreament(item._id)}
            >
              -
            </button>
          </div>
        </div>
      ))}
      {cart.length === 0 ? (
        <h1 className="text-center">No items in cart</h1>
      ) : (
        <div className=" bg-yellow-100 flex justify-center gap-10  mx-16 p-3 rounded-lg shadow-2xl">
          <h1 className="text-bold">
            TOTAL PRICE :{" "}
            <span className="text-red-500 font-medium">{totalAmount}</span>
          </h1>
          <button
            // onClick={handleCheckOut}
            onClick={() => navigate("/payment")}
            // onClick={setIsModal(true)}
            className="bg-green-500 text-white rounded-xl px-3 py-1   hover:bg-green-700"
          >
            Buy Now
          </button>
        </div>
      )}
     
      <Toaster />
      {/* <button onClick={handleCLick} className="border border-black">hi</button> */}
      
    </div>
   
  );
};

export default CartView;
