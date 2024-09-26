import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const PaymentPage = () => {
  // Custom validation logic
  const validateForm = (values) => {
    const errors = {};

    if (!values.fullName) {
      errors.fullName = 'Full Name is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.mobile) {
      errors.mobile = 'Mobile Number is required';
    } else if (values.mobile.length < 10) {
      errors.mobile = 'Mobile Number must be at least 10 digits';
    }

    if (!values.streetAddress) {
      errors.streetAddress = 'Street Address is required';
    }

    if (!values.pincode) {
      errors.pincode = 'Pincode is required';
    }

    if (!values.city) {
      errors.city = 'City is required';
    }

    if (!values.state) {
      errors.state = 'State is required';
    }

    if (!values.country) {
      errors.country = 'Country is required';
    }

    return errors;
  };

  return (
    <div className="mt-20 h-screen">
      <div className="flex justify-center w-full mb-5">
        <h1 className="text-xl font-bold">Shipping / Billing Address</h1>
      </div>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          mobile: '',
          streetAddress: '',
          pincode: '',
          city: '',
          state: '',
          country: '',
        }}
        validate={validateForm}
        onSubmit={(values, { setSubmitting }) => {
          // alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col justify-center items-center gap-4">
            <div>
              <Field
                className="border border-black px-5 py-2 rounded-lg shadow-2xl"
                type="text"
                name="fullName"
                placeholder="Full Name"
              />
              <ErrorMessage name="fullName" component="div" className="text-red-500" />
            </div>
            
            <div>
              <Field
                className="border border-black px-5 py-2 rounded-lg shadow-2xl"
                type="email"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>

            <div>
              <Field
                className="border border-black px-5 py-2 rounded-lg shadow-2xl"
                type="number"
                name="mobile"
                placeholder="Mobile Number"
              />
              <ErrorMessage name="mobile" component="div" className="text-red-500" />
            </div>

            <div>
              <Field
                className="border border-black px-5 py-2 rounded-lg shadow-2xl"
                type="text"
                name="streetAddress"
                placeholder="Street Address"
              />
              <ErrorMessage name="streetAddress" component="div" className="text-red-500" />
            </div>

            <div>
              <Field
                className="border border-black px-5 py-2 rounded-lg shadow-2xl"
                type="number"
                name="pincode"
                placeholder="Pincode"
              />
              <ErrorMessage name="pincode" component="div" className="text-red-500" />
            </div>

            <div>
              <Field
                className="border border-black px-5 py-2 rounded-lg shadow-2xl"
                type="text"
                name="city"
                placeholder="City"
              />
              <ErrorMessage name="city" component="div" className="text-red-500" />
            </div>

            <div>
              <Field
                className="border border-black px-5 py-2 rounded-lg shadow-2xl"
                type="text"
                name="state"
                placeholder="State"
              />
              <ErrorMessage name="state" component="div" className="text-red-500" />
            </div>

            <div>
              <Field
                className="border border-black px-5 py-2 rounded-lg shadow-2xl"
                type="text"
                name="country"
                placeholder="Country"
              />
              <ErrorMessage name="country" component="div" className="text-red-500" />
            </div>

            <button
              className="bg-blue-500 text-white px-8 rounded-md py-2 text-bold hover:bg-blue-700"
              type="submit"
              disabled={isSubmitting}
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
