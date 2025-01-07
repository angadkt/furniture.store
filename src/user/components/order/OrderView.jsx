import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { context_page } from "../../context/ContextProduct";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";










const OrderView = () => {

  const {orders , fetchOrders} = useContext(context_page)

  useEffect(()=>{
    fetchOrders()
  },[])



  



  return (
    <div className="container mx-auto p-4  mt-20">
      {orders.map((order, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300 mx-16"
        >
          <h2 className="text-xl font-semibold mb-4">Order {index + 1}</h2>
          <div className="space-y-4">
            {order.products.map((product) => (
              <div
                key={product.productsId._id}
                className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
              >
                <img
                  src={product.productsId.images[0]}
                  alt={product.productsId.name}
                  className="w-24 h-24 object-cover rounded-lg" 
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-600">{product.productsId.name}</h3>
                  <p className="text-sm text-gray-600">Category: {product.productsId.category}</p>
                  <p className="text-sm text-gray-600">Price: {product.productsId.price}</p>
                  <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                  {/* <p className="text-sm text-gray-600">Total Price:&nbsp; {(product.productsId.quantity)*(product.productsId  .price)}</p> */}
                </div>
              </div>
            ))}
            <div><p>Total Price: ₹{order.Total_Amount}</p></div>
            <div><p>Shipping address: {order.Address}</p></div>
            <div className="flex items-center justify-end md:justify-start   gap-1 flex-row-reverse"><p className="font-semibold">Payment Successful</p>
              <IoCheckmarkDoneCircleOutline className="text-4xl text-green-500 " />
              </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderView;
