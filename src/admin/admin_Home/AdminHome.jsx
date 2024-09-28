import React, { useContext, useEffect, useState } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaShopify } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { context_page } from "../../user/context/ContextProduct";
import AdminProducts from "../admin_products/AdminProducts";
import AdminUsers from "../admin_users/AdminUsers";

const AdminHome = () => {
  const { products, users } = useContext(context_page);
  const [page, setPage] = useState(()=>{
    return localStorage.getItem('page') || "dashboard"
  });

  useEffect(()=>{
    localStorage.setItem("page" , page);
  },[page])

  const handlePageChange = (str) => {
      setPage(str)  
  }

  return (
    <div className="h-[100%] w-[100%] flex">
      <nav className=" w-60 h-[100% ] bg-customBgAdmin">

        
        <div className=" w-full h-40 flex justify-center items-center bg-customBgAdmin">
          <h1 className="text-cutomBlueAdmin font-bold text-3xl">Admin.</h1>
        </div>


        <div className="bg-cutomBlueAdmin w-60 h-full rounded-tr-[90px]">
          <div className="w-full  h-[50%] flex flex-wrap flex-col  pl-10 justify-center">
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
            <div></div>
          </div>
        </div>
      </nav>



      <div className=" h-full w-full bg-white">
        {/*=============================Dashboard=========================================== */}
        {(page === 'dashboard') ? (
            <>
            <div className="">
          <h1 className="ml-10 pt-5 text-cutomBlueAdmin font-bold text-2xl">DashBoard.</h1>
        </div>
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
              <h1>orders.length</h1>
            </div>
            <div className="w-44 h-44 border flex items-center shadow-2xl bg-white rounded-2xl justify-center flex-col">
              <h1>Total Earnings</h1>
              <h1>total amount </h1>
            </div>
          </div>
        </div>
            </>
        ):(page === 'products') ? (<AdminProducts />) 
        : (page === 'users') && (<AdminUsers />)}
        
      </div>
    </div>
  );
};

export default AdminHome;
