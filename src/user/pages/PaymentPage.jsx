import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { context_page } from "../context/ContextProduct";
const apiUrl = import.meta.env.VITE_API_KEY;

const PaymentPage = () => {
  const navigate = useNavigate();

  // Custom validation logic based on schema
  const validateForm = (values) => {
    const errors = {};

    if (!values.fullName) {
      errors.fullName = "Full Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.mobile) {
      errors.mobile = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(values.mobile)) {
      errors.mobile = "Mobile Number must be exactly 10 digits";
    }

    if (!values.streetAddress) {
      errors.streetAddress = "Street Address is required";
    }

    if (!values.pincode) {
      errors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(values.pincode)) {
      errors.pincode = "Pincode must be 6 digits";
    }

    if (!values.city) {
      errors.city = "City is required";
    }

    if (!values.state) {
      errors.state = "State is required";
    }

    if (!values.country) {
      errors.country = "Country is required";
    }

    return errors;
  };
  // ===========================================================
  // const handleCheckOut = async ()=>{
  //   try{

  //   }
  //   catch(err){

  //   }
  // }

  // const handleSubmit =  (values) => {
  //   console.log("values" ,values);
  //   const {fullName, mobile, streetAddress} = values
  //   console.log(fullName, mobile,streetAddress);

  //   // const userId = localStorage.getItem("id")
  //   // try {
  //   //   const response = await axios.post(`http://localhost:4000/api/addorders/${userId}`, {
  //   //     fullName: values.fullName,
  //   //     email: values.email,
  //   //     mobile: values.mobile,
  //   //     Address: values.streetAddress,
  //   //     pincode: values.pincode,
  //   //     city: values.city,
  //   //     state: values.state,
  //   //     country: values.country,
  //   //   });
  //   //   console.log(response.data);
  //   //   // resetForm()
  //   //   toast("preparing order")
  //   //   navigate("/paymentDetails")
  //   // } catch (err) {
  //   //   console.log(`cannot post data to the data base ${err}`);
  //   // }
  // };
  const {
    cart,
    setQuantity,
    handleIncrement,
    handleDecreament,
    deleteCartItem,
    setCart,
    users,
    getCart,
  } = useContext(context_page);

  const userId = localStorage.getItem("id");
  const user = users?.find((item) => item._id === userId) || {};

  // console.log("cart",cart)
  // console.log("inside cart",cart.map((x)=> x.productsId))

  const cartProducts = cart.map((x) => x.productsId);

  const totalAmount = cart.reduce(
    (acc, cur) => acc + cur.quantity * cur.productsId.price,
    0
  );

  const handleCheckOut = async (values) => {
    const { fullName, mobile, streetAddress } = values;
    try {
      // console.log(userId);
      const response = await axios.post(`${apiUrl}/payment/${userId}`, {
        currency: "INR",
      });
      if (response.data.success) {
        const options = {
          key: "rzp_test_KVYa3j27SRKqtq",
          amount: totalAmount * 100,
          currency: "INR",
          name: "urban-oak",
          description: "Test Transaction",
          image: "",
          order_id: response.data.data.id,
          handler: async function (response) {
            const verificationResponse = await axios.post(
              `${apiUrl}/paymentverification/${userId}`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                Address: streetAddress,
              }
            );
            console.log("verification response", verificationResponse);

            if (verificationResponse.data.success) {
              toast.success(`You Paid ₹${totalAmount} Successfully`);
              navigate("/allproducts");
              window.location.reload();
            } else {
              toast.error("Payment verification failed");
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
          },
          notes: {
            address: user.address,
            pincode: user.pincode,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert(`Payment failed: ${response.error.description}`);
        });
        rzp1.open();
      } else {
        toast.error("Failed to create payment order");
      }
    } catch (error) {
      console.log(`error occured ${error}`);
      if (error) {
        toast.error("Cart is empty ");
        console.log("error", error);
      } else {
        console.error("Payment Creation Failed:", error);
        toast.error("Payment Creation Failed. Please try again.");
      }
    }
  };

  return (
    <div className="mt-10 h-full flex flex-wrap justify-center">
      <div className="flex justify-center w-full mb-5">
        <h1 className="text-xl font-bold">Shipping / Billing Address</h1>
      </div>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          mobile: "",
          streetAddress: "",
          pincode: "",
          city: "",
          state: "",
          country: "",
        }}
        validate={validateForm}
        onSubmit={(values, { setSubmitting }) => {
          // handleSubmit(values)
          handleCheckOut(values);
          // navigate("/paymentDetails", { state: { formData: values } });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col justify-center items-center gap-5 bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
            <FieldWithError
              name="fullName"
              placeholder="Full Name"
              type="text"
            />
            <FieldWithError name="email" placeholder="Email" type="email" />
            <FieldWithError
              name="mobile"
              placeholder="Mobile Number"
              type="number"
            />
            <FieldWithError
              name="streetAddress"
              placeholder="Street Address"
              type="text"
            />
            <FieldWithError
              name="pincode"
              placeholder="Pincode (6 digits)"
              type="number"
            />
            <FieldWithError name="city" placeholder="City" type="text" />
            <FieldWithError name="state" placeholder="State" type="text" />
            <FieldWithError name="country" placeholder="Country" type="text" />
            <button
              className="bg-blue-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-300 ease-in-out"
              type="submit"
              disabled={isSubmitting}
              // onClick={handleCheckOut(values)}
            >
              Proceed to Payment
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// Helper component for reusing field + error logic
const FieldWithError = ({ name, placeholder, type }) => (
  <div className="w-full">
    <Field
      className="border border-gray-300 px-5 py-3 rounded-full shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
      type={type}
      name={name}
      placeholder={placeholder}
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 mt-1 text-sm"
    />
  </div>
);

export default PaymentPage;
