import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {

  const navigate = useNavigate();
  // Custom validation logic
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
    } else if (values.mobile.length < 10) {
      errors.mobile = "Mobile Number must be at least 10 digits";
    }

    if (!values.streetAddress) {
      errors.streetAddress = "Street Address is required";
    }

    if (!values.pincode) {
      errors.pincode = "Pincode is required";
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
          // alert(JSON.stringify(values, null, 2));
          navigate('/paymentDetails');
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col justify-center items-center gap-5 bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
          <div className="w-full">
            <Field
              className="border border-gray-300 px-5 py-3 rounded-full shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
              type="text"
              name="fullName"
              placeholder="Full Name"
            />
            <ErrorMessage name="fullName" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
        
          <div className="w-full">
            <Field
              className="border border-gray-300 px-5 py-3 rounded-full shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
              type="email"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
        
          <div className="w-full">
            <Field
              className="border border-gray-300 px-5 py-3 rounded-full shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
              type="number"
              name="mobile"
              placeholder="Mobile Number"
            />
            <ErrorMessage name="mobile" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
        
          <div className="w-full">
            <Field
              className="border border-gray-300 px-5 py-3 rounded-full shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
              type="text"
              name="streetAddress"
              placeholder="Street Address"
            />
            <ErrorMessage name="streetAddress" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
        
          <div className="w-full">
            <Field
              className="border border-gray-300 px-5 py-3 rounded-full shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
              type="number"
              name="pincode"
              placeholder="Pincode"
            />
            <ErrorMessage name="pincode" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
        
          <div className="w-full">
            <Field
              className="border border-gray-300 px-5 py-3 rounded-full shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
              type="text"
              name="city"
              placeholder="City"
            />
            <ErrorMessage name="city" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
        
          <div className="w-full">
            <Field
              className="border border-gray-300 px-5 py-3 rounded-full shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
              type="text"
              name="state"
              placeholder="State"
            />
            <ErrorMessage name="state" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
        
          <div className="w-full">
            <Field
              className="border border-gray-300 px-5 py-3 rounded-full shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
              type="text"
              name="country"
              placeholder="Country"
            />
            <ErrorMessage name="country" component="div" className="text-red-500 mt-1 text-sm" />
          </div>
        
          <button
            className="bg-blue-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-300 ease-in-out"
            type="submit"
            disabled={isSubmitting}
            // onSubmit={navigate('/paymentDetails')}
          >
            Order
          </button>
        </Form>
        
        )}
      </Formik>
    </div>
  );
};

export default PaymentPage;
