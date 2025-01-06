import React, { useContext, useEffect, useState } from "react";
import { MdDashboardCustomize, MdOutlineLocationSearching } from "react-icons/md";
import { FaShopify } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { context_page } from "../../user/context/ContextProduct";
import AdminProducts from "../admin_products/AdminProducts";
import AdminUsers from "../admin_users/AdminUsers";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminHome = () => {
  // const [islogin, setIsLogin] = useState(null);
  const { products, users    } = useContext(context_page);
  const [page, setPage] = useState(()=>{
    return localStorage.getItem('page') || "dashboard"
  });
  const [allOrders, setAllOrders] = useState([])
  const [revenue , setRevenue] = useState() 

  const navigate = useNavigate();




  // ================================== all orders ========================================
  const getAllOrders = async () => {
    try{
      const response = await axios.get(`http://localhost:4000/api/totalorders`)
      // console.log(response.data.data);
      setAllOrders(response.data.data)
    }
    catch(err){
      console.log(`error occured ${err}`);
    }
  }
  useEffect(()=>{
    getAllOrders()
  },[])

  // ================================== total revenue =========================================
const totalRevenue = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/gettotalrevenue`)
    console.log();
    setRevenue(response.data.data[0].totalRevenue)
  } catch (error) {
    console.log(`error occured ${error}`);
  }
}

useEffect(()=>{
  totalRevenue()
},[])



  // =========================================================
  //fetching all orders
//  const allOrders = users.map((item)=> item.orders).flat();

 //total earnings
  // const totalProducts = allOrders.map((item)=> item.products).flat();
  // const totalEarnings = totalProducts.reduce((acc, item)=> acc + (item.price * item.quantity),0);



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
          <h1 className="pl-10 pt-5 text-cutomBlueAdmin font-bold text-2xl bg-gray-100">DashBoard.</h1>
        </div>
        <div className="min-h-screen bg-gray-100 p-10">
  {/* Dashboard Container */}
  <div className="w-full flex flex-col items-center justify-center mt-24">
    
    {/* Stats Section */}
    <div className="w-full max-w-5xl p-8 py-12 shadow-2xl rounded-3xl bg-cutomBlueAdmin flex flex-wrap gap-10 items-center justify-evenly">
      
      {/* Card: Total Products */}
      <div className="w-52 h-52 flex flex-col items-center justify-center bg-white shadow-lg rounded-xl transition-transform transform hover:scale-105">
        <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
        <p className="text-4xl font-bold text-blue-600">{products.length}</p>
      </div>

      {/* Card: Total Users */}
      <div className="w-52 h-52 flex flex-col items-center justify-center bg-white shadow-lg rounded-xl transition-transform transform hover:scale-105">
        <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
        <p className="text-4xl font-bold text-blue-600">{users.length}</p>
      </div>

      {/* Card: Total Orders */}
      <div className="w-52 h-52 flex flex-col items-center justify-center bg-white shadow-lg rounded-xl transition-transform transform hover:scale-105">
        <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
        <p className="text-4xl font-bold text-blue-600">{allOrders.length}</p>
      </div>

      {/* Card: Total Earnings */}
      <div className="w-52 h-52 flex flex-col items-center justify-center bg-white shadow-lg rounded-xl transition-transform transform hover:scale-105">
        <h2 className="text-lg font-semibold text-gray-700">Total Earnings</h2>
        <p className="text-4xl font-bold text-blue-600">${revenue}</p>
      </div>
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
