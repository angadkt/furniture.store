import React, { useContext, useEffect, useState } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaShopify } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { context_page } from "../../user/context/ContextProduct";
import AdminProducts from "../admin_products/AdminProducts";
import AdminUsers from "../admin_users/AdminUsers";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  // const [islogin, setIsLogin] = useState(null);
  const { products, users    } = useContext(context_page);
  const [page, setPage] = useState(()=>{
    return localStorage.getItem('page') || "dashboard"
  });

  const navigate = useNavigate();



  // =========================================================
  //fetching all orders
 const allOrders = users.map((item)=> item.orders).flat();

 //total earnings
  const totalProducts = allOrders.map((item)=> item.products).flat();
  const totalEarnings = totalProducts.reduce((acc, item)=> acc + (item.price * item.quantity),0);



  // useEffect(()=>{
  //   axios.get(`http://localhost:5999/users`)
  // },[])

  useEffect(()=>{
    localStorage.setItem("page" , page);
  },[page])

  const handlePageChange = (str) => {
      setPage(str)  
  }



  const handleAdminLogout = ()=>{
    localStorage.removeItem("is_admin")
    navigate("/signin")
    
    
  }

  const isAdmin = localStorage.getItem("is_admin")
 
  return (
    <div className="h-screen w-[100%] flex">
      {isAdmin ? <>
      <nav className=" w-60 h-[100% ] bg-customBgAdmin">

        
        <div className=" w-full h-40 flex justify-center items-center bg-customBgAdmin">
          <h1 className="text-cutomBlueAdmin font-bold text-3xl">Admin.</h1>
        </div>


        <div className="bg-cutomBlueAdmin w-60 h-full rounded-tr-[90px]">
          <div className="w-full  h-[50%] flex flex-col  pl-10 pt-10  justify-around">
            <div className="flex flex-col gap-4 text-xl text-white font-semibold">
              <button onClick={()=>handlePageChange('dashboard')} className="flex items-center gap-2 focus:border">
                <span>
                  <MdDashboardCustomize />
                </span>
                <span>Dashboard</span>
              </button >
              <button onClick={()=>handlePageChange('products')} className="flex gap-2 items-center focus:border">
                <span>
                  <FaShopify />
                </span>
                <span>Products</span>
              </button>
              <button onClick={()=>handlePageChange('users')} className="flex gap-2 items-center focus:border">
                <span>
                  <LuUsers />
                </span>
                <span>Users</span>
              </button>
            </div>
            <div>
              <button 
              onClick={handleAdminLogout}
              className=" px-4 py-1 bg-customButtonAdmin text-black font-semibold rounded-md hover:shadow-2xl hover:border-2 hover:border-slate-600">Sign Out</button>
            </div>
          </div>
        </div>
      </nav>



      <div className=" h-full w-full bg-white">
        {/*=============================Dashboard=========================================== */}
        {(page === 'dashboard') ? (
            <>
            <div className="">
          <h1 className="ml-10 pt-5 text-cutomBlueAdmin font-bold text-2xl">DashBoard.</h1>
        {/* </div>
        <div className="w-full h-full flex flex-wrap items-center justify-center ">
          <div className="flex flex-wrap gap-10  p-14 py-16 shadow-2xl items-center justify-center rounded-2xl bg-cutomBlueAdmin">
            <div className="w-44 h-44  flex items-center rounded-2xl flex-col justify-center bg-white shadow-2xl">
              <h1>Total Products</h1>
              <h1>{products.length}</h1>
            </div>
            <div className="w-44 h-44 border flex items-center  shadow-2xl bg-white rounded-2xl justify-center flex-col">
              <h1>Total Users</h1>
              <h1>{users.length}</h1>
            </div>
            <div className="w-44 h-44 border flex items-center shadow-2xl bg-white justify-center flex-col rounded-2xl">
              <h1>Total Orders</h1>
              <h1>{allOrders.length}</h1>
            </div>
            <div className="w-44 h-44 border flex items-center shadow-2xl bg-white rounded-2xl justify-center flex-col">
              <h1>Total Earnings</h1>
              <h1>{totalEarnings}</h1>
            </div>
          </div> */}
          <div className="w-full h-screen bg-white flex flex-wrap ">
            <div className="flex-1  flex flex-wrap flex-col mb-24 mt-10 mx-10 gap-10">
              <div className="bg-gray-300 flex-1 rounded-3xl hover:drop-shadow-2xl shadow-2xl"></div>
              <div className="flex-1 bg-gray-300 rounded-3xl shadow-2xl hover:drop-shadow-2xl "></div>
            </div>
            <div className="flex-1  flex flex-wrap flex-col mb-24 mt-10 mx-10 gap-10">
            <div className="bg-gray-300 flex-1 rounded-3xl hover:drop-shadow-2xl shadow-2xl"></div>
            <div className="flex-1 bg-gray-300 rounded-3xl hover:drop-shadow-2xl shadow-2xl"></div>
            </div>
          </div>
        </div>
            </>
        ):(page === 'products') ? (<AdminProducts />) 
        : (page === 'users') && (<AdminUsers />)}
        
      </div>
      </> : <p>Admin not logined</p>}
    </div>
  );
};

export default AdminHome;
