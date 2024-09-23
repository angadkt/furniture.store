import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const MobileNav = ({ mobView }) => {
  return (
    <AnimatePresence>
      {mobView && (
        // <div  className="fixed inset-0 flex justify-center items-start">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className=" w-full flex justify-center items-center  absolute top-14      z-50 rounded-xl md:hidden"
        >
          <div className="bg-purple-300 flex justify-center w-2/3 items-center rounded-xl">
          <div className="text-lg font-semibold   text-white py-10 ">
            <ul className="flex flex-col items-center">
              <Link to='/'>Home</Link>
              <Link to='/profile'>Profile</Link>
              <Link to='/search'>Search</Link>
              <Link to='/cart'>Cart</Link>
              <Link to='/signin'>
                <button className="bg-slate-500 py-1 px-2 rounded-lg  hover:bg-slate-300 hover:text-black">
                  Sign In
                </button>
              </Link>
              <Link to='/signup'>
                <button className="bg-slate-500 py-1 px-2 rounded-lg   hover:bg-slate-300 hover:text-black">
                  Sign Up
                </button>
              </Link>
            </ul>
          </div>
          </div>
        </motion.div>
      //  </div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
