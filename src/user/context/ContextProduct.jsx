import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useState } from "react";

export const context_page = createContext();

const ContextProduct = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);

  // =========================================== user data ===============================================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5999/users");
        setUsers(response.data);
      } catch (err) {
        console.log("error");
      }
    };
    fetchData();
  }, []);

  // ========================================= products data ==================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5999/products");
        setProducts(response.data);
      } catch (err) {
        console.log("error");
      }
    };
    fetchData();
  }, []);

  // ====================================  handle Add to cart=======================================================

  const iD = localStorage.getItem("id");
//   const {id, name, price} = element;
//   const handleAddToCart = (element) => {
//     if (!iD) {
//       alert("please login");
//       // console.log(iD);
//     } else {
//         console.log('logged in',iD);
        
//       let isPresent = false;
//       cart.forEach((item) => {
//         if (item.id === element.id) {
//           // console.log(`item`,item);

//           isPresent = true;
//           // alert('item already added')
//         }
//       });

//       if (isPresent) {
//         alert("item already added");
//       } else {
//         axios
//           .patch(`http://localhost:5999/users/${iD}`, {
//             cart: [...cart, element],
//           })
//           .then((res) => {
//             console.log(res);
//             setCart([...cart, element]);
//             alert("item added to the cart");

//             // alert('item added to the cart')
//             // console.log('wht the fuck is happening');
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     }
//   };

const handleAddToCart = (elem) =>{
    if(!iD){
        alert('Please login');
    }else{
        console.log("user already logged in", iD);
        let isPresent = cart.some((item)=>(item.id === elem.id));
        if(isPresent){
            alert('item already added');
        }else{
            // const sanitizedElem = {
            //     id: elem.id,
            //     name: elem.name, 
            //     image: elem.image,
            //     price: elem.price
            // };
            axios.patch(`http://localhost:5999/users/${iD}`, {
                cart: [...cart, elem],
            })
           .then((res)=>{
            console.log("cart added to db", res.data);
            setCart([...cart, elem]);
            alert('cart added successfully');
           })
           .catch((err)=>{
                console.log('error adding to cart', err);
            });
        }
    }
}

  return (
    <context_page.Provider value={{ products, users, handleAddToCart , cart , setCart }}>
      {children}
    </context_page.Provider>
  );
};

export default ContextProduct;
