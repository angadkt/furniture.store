import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
// import { axios } from "axios";










const OrderView = () => {
  const [specificOrder, setSpecificOrder] = useState([])

  const userId = localStorage.getItem('id');

//second time fetching user data

  useEffect(()=>{
    axios.get(`http://localhost:5999/users/${userId}`)
      .then((res)=>{
        setSpecificOrder(res.data.orders)
      })
      .catch((err)=> console.log(err)
      )
  },[userId])




  return (
    <div className="container mx-auto p-4  mt-20">
      {specificOrder.map((order, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300 mx-16"
        >
          <h2 className="text-xl font-semibold mb-4">Order {index + 1}</h2>
          <div className="space-y-4">
            {order.products.map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-600">Category: {product.category}</p>
                  <p className="text-sm text-gray-600">Price: {product.price}</p>
                  <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                  <p className="text-sm text-gray-600">Total Price:&nbsp; {(product.quantity)*(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderView;
