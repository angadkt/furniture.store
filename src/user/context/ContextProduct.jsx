import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const context_page = createContext();

const ContextProduct = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [deletedCartProduct, setDeletedCartProduct] = useState([]);
  const [justCart, setJustCart] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);
  // const [fetchedCart , setFetchedCart] = useState([])

  // =================== setting user id into state for management =====================

  useEffect(() => {
    const storedID = localStorage.getItem("id");
    if (storedID) {
      setUserId(storedID);
    }
  }, []);

  const iD = localStorage.getItem("id"); //globaly setting id in of the loggedin user to a variable for further use

  // ==================================================== order ==============================================================

  // const handleAddToOrders = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:5999/users/${userId}`);
  //     const fetchedUser = response.data;
  //     const orderNew = {
  //       products: fetchedUser.cart,
  //     };

  //     //initialize new user and modify
  //     const updatedUser = {
  //       ...fetchedUser,
  //       orders: [...(fetchedUser.orders || []), orderNew],
  //       cart: [],
  //     };
  //     console.log("latest user", updatedUser);

  //     await axios.put(`http://localhost:5999/users/${userId}`, updatedUser);

  //     setOrders((prevOrders) => [...prevOrders, orderNew]);
  //   } catch (err) {
  //     console.log("error getting user data", err);
  //   }
  // };

  // useEffect(() => {
  //   if (userId) {
  //     axios
  //       .get(`http://localhost:5999/users/${userId}`)
  //       .then((res) => {
  //         setOrders(res.data.orders);
  //         console.log(userId);
  //         console.log(res.data.orders);
  //       })
  //       .catch((err) => {
  //         console.log("error getting orders", err);
  //       });
  //   }
  // }, [userId]);

  // =========================================== user data ===============================================================

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5999/users");
  //       setUsers(response.data);
  //     } catch (err) {
  //       console.log("error");
  //     }
  //   };
  //   fetchData();
  // }, []);

  // ========================================= fetching   products data ==================================================
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/products");
      setProducts(response.data.data);
      // console.log(response.data.data)
    } catch (err) {
      console.log("err");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =============================== fetch User data from db =========================================

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/getusers`);
      const data = response.data.data;
      setUsers(data);
    } catch (err) {
      console.log(`error occured ${err}`);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  // ============================ order fetching ==============================

  const fetchOrders = async () => {
    const userId = localStorage.getItem("id")
    try {
      const response = await axios.get(`http://localhost:4000/api/getorders/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response.data);
      setOrders(response.data.data)
      
    } catch (error) {
      console.log(`error occured ${error}`);
      
    }
  }

  useEffect(()=>{
    fetchOrders() 
  },[])

















  // ====================================  handle Add to cart=======================================================
  

  //////////////////// cart section ///////////////////////////////////////
  const isBlocked = localStorage.getItem("isBlocked");
  const cartUser = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  let deletedProduct = {};

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/addtocart/${cartUser}`,
        { productsId: productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      console.log("data", data);
      setJustCart(data);

      if (response.status == 200) toast(response.data.message);
    } catch (err) {
      if (err.response.data.success == false) {
        toast(err.response.data.message);
      }
    }
  };

  const getCart = async () => {
    console.log("getting cart");
    
    try {
      const response = await axios.get(
        `http://localhost:4000/api/getcart/${cartUser}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("cart console is working",response.data.data.products)
      const fetchedCart = response.data.data.products;
      if (JSON.stringify(fetchedCart) != JSON.stringify(cart)) {
        setCart(fetchedCart);
        console.log("quantity",fetchedCart[0].quantity);
        console.log("cart check",fetchedCart);
        
      }
    } catch (err) {
      console.log("error occured", err);
    }
  };

  useEffect(() => {
    getCart();
  }, [deletedCartProduct, justCart]);

  // ================================================================

  const deleteCartItem = async (productsId) => {
    console.log(cartUser);
    console.log("product id", productsId);
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/deleteitem/${cartUser}`,
        {
          data: { productsId },
        }
      );
      console.log(response.data.data);
      deletedProduct = response.data.data;
      setDeletedCartProduct(deletedProduct);
    } catch (err) {
      console.log(`error occured ${err}`);
    }
  };

  // ======================================================================

  const handleIncrement = async (productId) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/increament/${cartUser}`,
        {
          productsId: productId,
        }
      );
      const data = response.data;
      console.log("updated data", data);
      toast("quantity increamented");
      getCart()
    } catch (err) {
      console.log(`error occured ${err}`);
    }
  };

  const handleDecreament = async (productsId) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/decreament/${cartUser}`,
        { productsId }
      );
      const data = response.data;
      console.log("updated data", data.message);
      console.log("response", response);
      toast("quantity decreamented");
      getCart()
    } catch (err) {
      console.log(`error occured ${err}`);
    }
  };

  // useEffect(() => {}, [cart]);
  // const handleAddToCart = (elem) => {
  //   if (!cartUser) {
  //     toast("Please login");
  //     // console.log(cartUser);
  //   } else if (isBlocked == "true") {
  //     toast("your account is blocked");
  //   } else {
  //     // console.log("user already logged in", cartUser);
  //     let isPresent = cart.some((item) => item.id === elem.id);
  //     if (isPresent) {
  //       toast("item already added");
  //       console.log(iD);
  //     }
  // else {
  //   axios
  //     .patch(`http://localhost:5999/users/${iD}`, {
  //       cart: [...cart, elem],
  //     })
  //     .then((res) => {
  //       setCart((prevCart) => [...prevCart, elem]);
  //       toast("cart added successfully");
  //     })
  //     .catch((err) => {
  //       console.log("error adding to cart", err);
  //     });
  // }
  //   }
  // };

  // const handleRemoveCart = (item) => {
  //   const newCart = cart.filter((x) => {
  //     return x.id !== item.id;
  //   });
  //   axios.patch(`http://localhost:5999/users/${iD}`, {
  //     cart: newCart,
  //   });
  //   setCart(newCart);
  // };

  // // =================== quantity ==============================

  // const increment = (cartItem, num) => {
  //   if (num === -1 && cartItem.quantity === 1)
  //     return toast("quantity cant be zero");
  //   if (cartItem.quantity >= 1) {
  //     const newCart = (prevCart) => {
  //       let flag = prevCart.findIndex((item) => item.id === cartItem.id);
  //       if (flag >= 0) {
  //         prevCart[flag] = {
  //           ...prevCart[flag],
  //           quantity: prevCart[flag].quantity + num,
  //         };
  //         return prevCart;
  //       }
  //     };

  //     const updateCart = newCart(cart);
  //     setCart(updateCart);

  //     axios
  //       .patch(`http://localhost:5999/users/${iD}`, {
  //         cart: updateCart,
  //       })
  //       .then((res) => console.log("done", res.data))
  //       .catch((err) => console.log(err));
  //   } else {
  //     toast("quantity cant be zero");
  //   }
  // };

  // ============================= Admin functions ================================

  //delete products

  const deleteProduct = async (productsId) => {
    if (!productsId) {
      console.error(`productsId missing`);
    }
    console.log(productsId);
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/deleteproduct`,
        {
          data: { productsId },
        }
      );
      console.log(response.data.data);
      const deletedData = response.data.data;
      setDeletedProducts(deletedData);

      toast("product deleted");
      fetchData();
    } catch (err) {
      console.log(`error occured ${err}`);
    }
  };

  // const editProduct  = async (productsId) => {
  //   try{
  //     const response = await axios.put(`http://localhost:4000/api/editproduct/${productsId}`,{
  //       data:{name, category, details, images, price, quantity}
  //     })
  //   }
  //   catch(err){
  //     console.log(`error occured ${err}`)
  //   }
  // }

  // const handleDeleteProduct = (item) => {
  //   axios
  //     .delete(`http://localhost:5999/products/${item.id}`)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));

  //   const updatedProductList = products.filter((x) => x.id !== item.id);
  //   setProducts(updatedProductList);
  //   toast("product deleted");
  // };
  // ..................................

  // ...........................................

  //delete user

  // const handleDeleteUser = (currentuser) => {
  //   axios
  //     .delete(`http://localhost:5999/users/${currentuser.id}`)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));

  //   const updateUserList = users.filter((user) => user.id !== currentuser.id);
  //   setUsers(updateUserList);
  //   toast("user deleted");
  // };

  const handleRemoveUser = async (userid) => {
    try{
      const response =  await axios.delete(`http://localhost:4000/api/deleteuser/${userid}`)
      toast("user deleted ")
    }
    catch(err){
      console.log(`error occured ${err}`);
      
    }
  }

  // .............................................................
  //block user

  // const handleUserStatus = (currentuser) => {
  //   const upDateActive = !active;
  //   setActive(upDateActive);

  //   axios
  //     .patch(`http://localhost:5999/users/${currentuser.id}`, {
  //       isActive: upDateActive,
  //     })
  //     .then((res) => {
  //       console.log("user active status updates", res);
  //       console.log(active);

  //       localStorage.setItem("active", upDateActive);
  //     })
  //     .catch((err) => console.log("error in updating active status", err));
  // };

  const blockAndUnblockUser = async (userId) => {
    try{
      const response = await axios.put(`http://localhost:4000/api/blockandunblock/${userId}`)
      console.log(response.data.data)
      toast("user status updated")
    }
    catch(err){
      console.log(`error occured ${err}`);
    }
  }

  //admin logOut

  // ==============================================================

  return (
    <context_page.Provider
      value={{
        products,
        setProducts,
        users,
        // handleAddToCart,
        cart,
        setCart,
        setQuantity,
        // handleAddToOrders,
        orders,
        addToCart,
        deleteCartItem,
        setDeletedCartProduct,
        handleIncrement,
        handleDecreament,
        deleteProduct,
        fetchData, //fetching product data function
        getCart, //function to get cart data
        fetchUsers,//fetch user data
        blockAndUnblockUser,
        handleRemoveUser,
        fetchOrders ,
        
      }}
    >
      {children}
    </context_page.Provider>
  );
};

export default ContextProduct;
