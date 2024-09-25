import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useState } from "react";

export const context_page = createContext();

const ContextProduct = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  



  // =======================================  search onChange function =========================================================

  const handleSearchChange = (e) => {
      setSearch(e.target.value);
  }



  

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

const handleAddToCart = (elem) =>{
    if(!iD){
        alert('Please login');
    }else{
        console.log("user already logged in", iD);
        let isPresent = cart.some((item)=>(item.id === elem.id));
        if(isPresent){
            alert('item already added');
        }else{
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


const handleRemoveCart = (item)=> {
    const newCart = cart.filter((x)=>{
      return x.id !== item.id;
    })
    axios.patch(`http://localhost:5999/users/${iD}`, {
      "cart": newCart,
    })
    setCart(newCart);
}





// =================== quantity ==============================


const increment = ()=>{
  setQuantity( q => q+1);
  axios.patch(`http://localhost:5999/users/${iD}`,{
    "quantity" : setQuantity(quantity)
  })
  
}

const decrement = ()=>{
  if(quantity > 0){

    setQuantity( q => q-1);
  }else{
    handleRemoveCart();
  }
}











// ==============================================================

  return (
    <context_page.Provider 
    value={{ products, users, handleAddToCart , cart , setCart, handleRemoveCart , increment , decrement , quantity  }}>
      {children}
    </context_page.Provider>
  );
};

export default ContextProduct;
