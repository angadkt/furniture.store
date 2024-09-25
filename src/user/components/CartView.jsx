import React, { useContext, useEffect, useState } from "react";
import { context_page } from "../context/ContextProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartView = () => {
  const { cart, setCart, handleRemoveCart, increment, decrement, quantity } =
    useContext(context_page);
  const navigate = useNavigate();
  // const [cartData , setCartData] = useState([])

  const iD = localStorage.getItem("id");

  useEffect(() => {
    if (!iD) {
      alert("please login first");
    } else {
      axios
        .get(`http://localhost:5999/users/${iD}`)
        .then((res) => setCart(res.data.cart));
    }
  }, []);

  const totalPrize = cart.reduce((acc, element) => acc + (element.price), 0);

  if (!cart) {
    return (
      <div className="flex justify-center items-center">
        Loading...........................
      </div>
    );
  }

  return (
    <div className="mt-20 flex flex-col flex-wrap gap-5 ">
      {cart.map((item) => (
        <div
          key={item.id}
          className=" mx-20 p-4 rounded-xl shadow-xl flex-wrap flex gap-4"
        >
          <div>
            <img
              className="w-20 h-20 rounded-md "
              src={item.image}
              alt={item.name}
            />
          </div>
          <div>
            <h1>{item.name}</h1>
            <h1>MRP : {item.price}</h1>
            <button
              onClick={() => handleRemoveCart(item)}
              className="bg-red-500 text-white px-1 rounded-sm hover:bg-red-700 shadow-2xl"
            >
              Remove
            </button>
          </div>
          <div>
            <span>Qty: &nbsp;</span>
            <button
              className="rounded-lg border-4 px-2"
              onClick={() => increment(item.id)}
            >
              +
            </button>
            <span className="m-2 ">{quantity}</span>
            <button
              className="rounded-lg border-4 px-2"
              onClick={() => decrement(item.id)}
            >
              -
            </button>
          </div>
        </div>
      ))}
      {cart.length === 0 ? (
        <h1 className="text-center">No items in cart</h1>
      ) : (
        <div className=" bg-customDarkPurple flex justify-center gap-10  mx-16 p-3 rounded-lg shadow-2xl">
          <h1 className="text-bold">
            TOTAL PRICE :{" "}
            <span className="text-red-500">{Math.floor(totalPrize)}</span>
          </h1>
          <button
            onClick={() => navigate("/payment")}
            className="bg-green-500 text-white rounded-xl px-3 py-1   hover:bg-green-700"
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default CartView;
