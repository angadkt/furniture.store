import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { toast, Toaster } from "react-hot-toast";

// import toast , {Toaster} from "react-hot-toast";
// import { context_page } from "../context/ContextProduct";

const SignIn = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDeatils] = useState({
    email: "",
    password: "",
  });
  // const {users} = useContext(context_page);

  const [errors, setErrors] = useState({});
  const [valid, setValild] = useState(true);

  const handleSubmit = (e) => {
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

    if (
      userDetails.email === "admin123@gmail.com" &&
      userDetails.password === "12345678"
    ) {
      toast.success("Loginned to admin panel");
      navigate("/adminhome");
      localStorage.setItem("is_admin", true);
    }

    axios
      .get("http://localhost:5999/users")
      .then((res) => {
        res.data.map((user) => {
          // console.log('res:',res)

          if (user.email === userDetails.email) {
            if (user.password === userDetails.password) {
              toast.success("Login successful");
              navigate("/");
              localStorage.setItem("id", user.id);
              localStorage.setItem("username", user.username);
              localStorage.setItem("email", user.email);
            } else {
              isvalid = false;
              validationErrors.password = "Invalid password";
            }
          } else if (userDetails.email !== "") {
            isvalid = false;
            validationErrors.email = "Email does not exist";
          }
        });
        setErrors(validationErrors);
        setValild(isvalid);
      })
      .catch((err) => console.log(err));
    console.log(localStorage);
  };


  

  return (
    <div
      className="w-screen h-screen bg-white flex flex-col 
     justify-center items-center"
    >
      <div className="  p-20 rounded-2xl bg-white  border-2 border-yellow-100 drop-shadow-[0_10px_10px_rgba(234,179,8,0.4)]">
        <form onSubmit={handleSubmit} className="flex flex-col flex-wrap gap-4">
        <span className="text-4xl font-bold text-customText">
  Sign In
</span>


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
          <Link to="/signup" className="text-red-500 text-sm hover:text-red-800">
            Sign up
          </Link>
        </span>
      </div>
      {/* < Toaster /> */}
    </div>
  );
};

export default SignIn;
