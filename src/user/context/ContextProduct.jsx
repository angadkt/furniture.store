import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_KEY;

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

  // ========================================= fetching   products data ==================================================
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products`);
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
      const response = await axios.get(`${apiUrl}/getusers`);
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
    const userId = localStorage.getItem("id");
    try {
      const response = await axios.get(`${apiUrl}/getorders/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setOrders(response.data.data);
    } catch (error) {
      console.log(`error occured ${error}`);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ===============================  getProducts by search ======================================

  // ====================================  handle Add to cart=======================================================

  const isBlocked = localStorage.getItem("isBlocked");

  const token = localStorage.getItem("token");

  const addToCart = async (productId, quantity) => {
    const cartUser = localStorage.getItem("id");
    try {
      console.log("cartUser", cartUser);
      const response = await axios.post(
        `${apiUrl}/addtocart/${cartUser}`,
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

      getCart();
    } catch (err) {
      if (err.response.data.success == false) {
        toast(err.response.data.message);
      }
    }
  };
  // =================================== getCart ==============================================
  const getCart = async () => {
    const cartUser = localStorage.getItem("id");
    try {
      const response = await axios.get(`${apiUrl}/getcart/${cartUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("cart console is working",response.data.data.products)
      const fetchedCart = response.data.data.products;
      if (JSON.stringify(fetchedCart) != JSON.stringify(cart)) {
        setCart(fetchedCart);
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
    const cartUser = localStorage.getItem("id");
    try {
      const response = await axios.delete(`${apiUrl}/deleteitem/${cartUser}`, {
        data: { productsId },
      });
      toast("Product removed from the cart");
      const deletedProduct = response.data.data;
      setDeletedCartProduct(deletedProduct);
    } catch (err) {
      console.log(`error occured ${err}`);
    }
  };

  // ======================================================================

  const handleIncrement = async (productId) => {
    const cartUser = localStorage.getItem("id");
    try {
      const response = await axios.patch(`${apiUrl}/increament/${cartUser}`, {
        productsId: productId,
      });
      const data = response.data;
      toast("quantity increamented");
      getCart();
    } catch (err) {
      console.log(`error occured ${err}`);
    }
  };

  const handleDecreament = async (productsId) => {
    const cartUser = localStorage.getItem("id");
    try {
      const response = await axios.patch(`${apiUrl}/decreament/${cartUser}`, {
        productsId,
      });
      const data = response.data;
      toast("quantity decreamented");
      getCart();
    } catch (err) {
      console.log(`error occured ${err}`);
    }
  };

  // ============================= Admin functions ================================

  //delete products

  const deleteProduct = async (productsId) => {
    if (!productsId) {
      console.error(`productsId missing`);
    }
    console.log(productsId);
    try {
      const response = await axios.delete(`${apiUrl}/deleteproduct`, {
        data: { productsId },
      });
      const deletedData = response.data.data;
      setDeletedProducts(deletedData);

      toast("product deleted");
      fetchData();
    } catch (err) {
      console.log(`error occured ${err}`);
    }
  };

  const handleRemoveUser = async (userid) => {
    try {
      const response = await axios.delete(`${apiUrl}/deleteuser/${userid}`);
      toast("user deleted ");
      fetchUsers();
    } catch (err) {
      console.log(`error occured ${err}`);
    }
  };

  // .............................................................
  //block user

  const blockAndUnblockUser = async (userId) => {
    try {
      const response = await axios.put(`${apiUrl}/blockandunblock/${userId}`);
      console.log(response.data.data);
      toast("user status updated");
    } catch (err) {
      console.log(`error occured ${err}`);
    }
  };

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
        fetchUsers, //fetch user data
        blockAndUnblockUser,
        handleRemoveUser,
        fetchOrders,
      }}
    >
      {children}
    </context_page.Provider>
  );
};

export default ContextProduct;
