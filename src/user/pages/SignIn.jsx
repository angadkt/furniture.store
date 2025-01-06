import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { context_page } from "../context/ContextProduct";
// import { toast, Toaster } from "react-hot-toast";

// import toast , {Toaster} from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDeatils] = useState({
    email: "",
    password: "",
  });
  const {getCart} = useContext(context_page);

  const [errors, setErrors] = useState({});
  const [valid, setValild] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};

    if (userDetails.email === "" || userDetails.email === null) {
      validationErrors.email = "Email is required";
      isvalid = false;
    } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      isvalid = false;
      validationErrors.email = "Invalid email format";
    }

    if (userDetails.password === "" || userDetails.password === null) {
      validationErrors.password = "Password is required";
      isvalid = false;
    } else if (userDetails.password.length < 6) {
      isvalid = false;
      validationErrors.password = "Password must be at least 6 characters long";
    }
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email: userDetails.email,
        password: userDetails.password,
      });
      // console.log(response.data)
     
      
      if (response.data.data.role === "admin") {
        const userId = response.data.data._id;
        const token = response.data.token
        localStorage.setItem("is_admin", true)
        localStorage.setItem("token", token)
        navigate("/adminhome")
      } else {
        toast.success(response.data.message);
        const userId = response.data.data._id;
        const isBlocked = response.data.data.isBlocked
        const token = response.data.token
        const userName = response.data.data.name
        localStorage.setItem("id", userId);
        localStorage.setItem("isBlocked", isBlocked);
        localStorage.setItem("token", token)
        localStorage.setItem("name", userName)
        navigate("/");
        getCart()
      }
    } catch (err) {
      
      if (err.response.status == 404) {
        console.log(err.response.data.message);
        toast.warn(err.response.data.message);
      }else if(err.response.status == 400){
        toast.warn(err.response.data.message);
      }
    }
  };

  return (
    <div
      className="w-screen h-screen bg-white flex flex-col 
     justify-center items-center"
    >
      <div className="  p-20 rounded-2xl bg-white  border-2 border-yellow-100 drop-shadow-[0_10px_10px_rgba(234,179,8,0.4)]">
        <form onSubmit={handleSubmit} className="flex flex-col flex-wrap gap-4">
          <span className="text-4xl font-bold text-customText">Sign In</span>

          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={(e) =>
              setUserDeatils({ ...userDetails, email: e.target.value })
            }
            className="p-3 w-80 rounded-xl border border-yellow-100 focus:border-2 focus:border-yellow-300 focus:outline-none"
          />
          {valid ? (
            <></>
          ) : (
            <p className="text-red-600 text-[13px]">{errors.email}</p>
          )}

          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) =>
              setUserDeatils({ ...userDetails, password: e.target.value })
            }
            className="p-3 w-80 rounded-xl border border-yellow-100 focus:border-2 focus:border-yellow-300 focus:outline-none"
          />
          {valid ? (
            <></>
          ) : (
            <p className="text-red-600 text-[13px]">{errors.password}</p>
          )}

          {/* <Link to="/"> */}
          <button
            // className="  w-20 p-1 rounded-md bg-slate-500 text-white hover:bg-slate-700"
            className="  w-20 p-1 rounded-md bg-white text-customText border-2  border-yellow-200 hover:bg-yellow-300 hover:text-white font-semibold"
          >
            Sign In
          </button>
          {/* </Link> */}
        </form>
        <span className="text-sm ">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-red-500 text-sm hover:text-red-800"
          >
            Sign up
          </Link>
        </span>
      </div>
      {/* < Toaster /> */}
    </div>
  );
};

export default SignIn;
