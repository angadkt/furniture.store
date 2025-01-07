import { motion, AnimatePresence } from "framer-motion";
import React, { useContext } from "react";
import { Link , NavLink } from "react-router-dom";
import { context_page } from "../context/ContextProduct";
import { IoMdClose } from "react-icons/io";

const MobileNav = ({ mobView, setMobView }) => {
  const { users } = useContext(context_page);

  const id = localStorage.getItem("id");
  
  const currentUserCheck = users.find((user) => user.id === id);

  const handleTheSignOut = () => {
    localStorage.removeItem("id");
  } 
  return (
    <AnimatePresence>
      {mobView && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed inset-0 flex justify-center items-center z-50  "
        >
          {currentUserCheck ? (
            <div className="w-full absolute top-14 px-4 flex justify-center items-center md:hidden">
              <div className="bg-customDarkPurple  w-2/3 p-6 rounded-xl shadow-lg">
                <div className="text-lg font-semibold text-white py-6">
                  <ul className="flex flex-col items-center space-y-4">
                    <Link
                      to="/"
                      className="hover:text-purple-200 transition-colors duration-200"
                    >
                      Home
                    </Link>
                    <Link
                      to="/profile"
                      className="hover:text-purple-200 transition-colors duration-200"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/search"
                      className="hover:text-purple-200 transition-colors duration-200"
                    >
                      Search
                    </Link>
                    <Link
                      to="/cart"
                      className="hover:text-purple-200 transition-colors duration-200"
                    >
                      Cart
                    </Link>
                    <NavLink to="/signin">
                      <button
                        className="bg-slate-500 py-2 px-4 rounded-lg hover:bg-slate-300 hover:text-black transition-all duration-300"
                        onClick={handleTheSignOut}
                      >
                        Sign Out
                      </button>
                    </NavLink>
                    <button onClick={()=>setMobView(false)}><IoMdClose size={26} /></button>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full absolute top-14 px-4 flex justify-center items-center md:hidden">
              <div className="bg-purple-500 w-2/3 p-6 rounded-xl shadow-lg">
                <div className="text-lg font-semibold text-white py-6">
                  <ul className="flex flex-col items-center space-y-4">
                    <Link
                      to="/"
                      className="hover:text-purple-200 transition-colors duration-200"
                    >
                      Home
                    </Link>
                    <Link
                      to="/profile"
                      className="hover:text-purple-200 transition-colors duration-200"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/search"
                      className="hover:text-purple-200 transition-colors duration-200"
                    >
                      Search
                    </Link>
                    <Link
                      to="/cart"
                      className="hover:text-purple-200 transition-colors duration-200"
                    >
                      Cart
                    </Link>
                    <Link to="/signin">
                      <button className="bg-slate-500 py-2 px-4 rounded-lg hover:bg-slate-300 hover:text-black transition-all duration-300">
                        Sign In
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button className="bg-slate-500 py-2 px-4 rounded-lg hover:bg-slate-300 hover:text-black transition-all duration-300">
                        Sign Up
                      </button>
                    </Link>
                    <button onClick={()=>setMobView(false)}><IoMdClose size={26} />
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          )
          }
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
