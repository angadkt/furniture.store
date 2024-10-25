import React, { useContext, useState } from "react";
import {  NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import MobileNav from "./MobileNav";
import { FaOpencart } from "react-icons/fa";
import { context_page } from "../context/ContextProduct";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [mobView, setMobView] = useState(false);
  const { users } = useContext(context_page);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const id = localStorage.getItem("id");
  if (!id) {
    console.log("No ID found in localStorage.");
  }

  const currentUser = users.find((item) => item.id === id);

  const Links = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/allproducts" },
    // { name: input>, link: '/search' },
    {
      name: (
        <div className="flex ">
          Cart <FaOpencart size={26} />
        </div>
      ),
      link: "/cart",
    },
  ];

  // ======================== sign out function ===================================
  const handleSignOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
  };

  // ============================= modal functions  ==============================

  const nameOfUser = localStorage.getItem("username");
  const emailOfUser = localStorage.getItem("email");
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleModalnavigate = ()=>{
    setIsModalOpen(false)
    navigate('/orders')
  }
//   ==========================================

  return (
    <>
      <nav className="w-screen h-20  flex flex-wrap  fixed top-0 z-50">
        <div className="md:flex-1  flex items-center w-full  justify-between">
          <span className="md:ml-16 ml-8 md:text-4xl text-2xl">Urban Oak</span>
          <div className=" md:hidden">
            <button
              className="mr-8 text-4xl"
              onClick={() => setMobView(!mobView)}
            >
              {/* {
                                console.log(mobView)
                                
                            } */}
              <MdMenu />
            </button>
          </div>
        </div>
        <div className="flex-1  md:flex justify-center items-center hidden">
          <ul className="flex flex-wrap gap-4 text-lg">
            {Links.map((x, i) => (
              <NavLink key={i} to={x.link}>
                {x.name}
              </NavLink>
            ))}
          </ul>
        </div>
        {currentUser ? (
          <div className="flex-1 md:flex justify-end items-center hidden">
            <span className="mr-16 flex gap-3 items-center">
              <NavLink to="/signin">
              <button onClick={handleSignOut}
              class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Sign Out
</span>
</button>
              </NavLink>
              <button onClick={toggleModal}>
                <FaRegUserCircle size={30} />
              </button>
            </span>
          </div>
        ) : (
          <div className="flex-1 md:flex justify-end items-center hidden">
            <span className="mr-16 ">
              <NavLink to="/signin">
                <button className="bg-slate-300 py-2 px-4 rounded-lg rounded-tr-none rounded-br-none hover:bg-slate-500 hover:text-white">
                  Sign In
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="bg-slate-300 py-2 px-4 rounded-lg rounded-tl-none rounded-bl-none hover:bg-slate-500 hover:text-white">
                  Sign Up
                </button>
              </NavLink>
            </span>
          </div>
        )}
      </nav>
      <MobileNav mobView={mobView} setMobView={setMobView} />


      {/* ========================= modal ============================= */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-start justify-end bg-transparent bg-opacity-50 mt-20 mr-20">
          <div className="bg-white rounded-lg p-8 shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">{nameOfUser}</h2>
            <p className="mb-6">{emailOfUser}</p>

            {/* Buttons in the modal */}
            <div className="flex justify-end space-x-4">
              {/* <button
                // onClick={toggleModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
              >
                Cancel
              </button> */}
              <button
                onClick={handleModalnavigate}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
              >
                My Orders
              </button>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Navbar;
