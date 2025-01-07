import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { context_page } from "../context/ContextProduct";
import {toast} from "react-toastify";
const apiUrl = import.meta.env.VITE_API_KEY

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { users, setUsers } = useContext(context_page);

  const [userDeatils, setUserDeatils] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    cart: [],
    orders: [],
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userDeatils);
    let isvalid = true;
    let validationErrors = {};

    if (userDeatils.username === "" || userDeatils.username === null) {
      validationErrors.username = "Username is required";
      isvalid = false;
    }

    if (userDeatils.email === "" || userDeatils.email === null) {
      validationErrors.email = "Email is required";
      isvalid = false;
    } else if (!/\S+@\S+\S+/.test(userDeatils.email)) {
      isvalid = false;
      validationErrors.email = "Invalid email format";
    }

    if (userDeatils.password === "" || userDeatils.password === null) {
      validationErrors.password = "Password is required";
      isvalid = false;
    } else if (userDeatils.password.length < 6) {
      isvalid = false;
      validationErrors.password = "Password must be at least 6 characters long";
    }

    if (userDeatils.confirmPassword !== userDeatils.password) {
      isvalid = false;
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);
    setValid(isvalid);

    if (Object.keys(validationErrors).length === 0) {
      //   axios.post('http://localhost:5999/users', userDeatils)
      //   .then(res => {
      //     alert('registered succesfully');
      //     navigate('/signin')
      //     setUsers([...users, userDeatils])
      //   })
      //   .catch(err => console.log(err))
      try {
        const response = await axios.post(
          `${apiUrl}/register`,
          {
            name: userDeatils.username,
            email: userDeatils.email,
            password: userDeatils.confirmPassword,
          }
        );

        if (response.status == 201) {
          toast(response.data.message);
          navigate("/signin");
        }
      } catch (err) {
        if (err.response.status == 400) {
          toast.warn(`${err.response.data.message}`);
          console.log(`error occured posting userdata ${err.response.data}`);
          // navigate("/signin");
        } else {
          console.log(`error occured, ${err}`);
        }
      }
    }
  };

  return (
    <div
      className="w-screen h-screen bg-white flex flex-col 
     justify-center items-center"
    >
      <div className="  p-20 rounded-2xl bg-white shadow-2xl border-2 border-yellow-100 drop-shadow-[0_10px_10px_rgba(234,179,8,0.4)]">
        {/* {
          valid?<></>:<span></span>
        } */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-wrap gap-4">
          <span className="text-4xl font-bold text-customText">
            Create Account
          </span>

          <div>
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={(e) =>
                setUserDeatils({ ...userDeatils, username: e.target.value })
              }
              className="p-3 w-80 rounded-xl focus:outline-none border border-yellow-100 focus:border-2 focus:border-yellow-300"
            />
            {valid ? (
              <></>
            ) : (
              <p className="text-red-600 text-[13px]">{errors.username}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={(e) =>
                setUserDeatils({ ...userDeatils, email: e.target.value })
              }
              className="p-3 w-80 rounded-xl focus:outline-none border border-yellow-100 focus:border-2 focus:border-yellow-300"
            />
            {valid ? (
              <></>
            ) : (
              <p className="text-red-600 text-[13px]">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={(e) =>
                setUserDeatils({ ...userDeatils, password: e.target.value })
              }
              className="p-3 w-80 rounded-xl focus:outline-none border border-yellow-100 focus:border-2 focus:border-yellow-300"
            />
            {valid ? (
              <></>
            ) : (
              <p className="text-red-600 text-[13px]">{errors.password}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="confirm password"
              name="confirmPassword"
              onChange={(e) =>
                setUserDeatils({
                  ...userDeatils,
                  confirmPassword: e.target.value,
                })
              }
              className="p-3 w-80 rounded-xl focus:outline-none border border-yellow-100 focus:border-2 focus:border-yellow-300"
            />
            {valid ? (
              <></>
            ) : (
              <p className="text-red-600 text-[13px]">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="  w-20 p-1 rounded-md bg-white text-customText border-2  border-yellow-200 hover:bg-yellow-300 hover:text-white font-semibold "
          >
            Sign Up
          </button>
        </form>
        <span className="text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="text-red-500 text-sm">
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default RegistrationForm;
