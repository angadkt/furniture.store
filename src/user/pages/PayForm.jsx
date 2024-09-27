import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import { context_page } from '../context/ContextProduct';

const PayForm = () => {
  const {handleAddToOrders , cart} = useContext(context_page);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Formik
        initialValues={{
          cardNumber: '',
          expiryDate: '',
          cvv: '',
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          const errors = {};
          // Simple validation
          if (!/^\d{16}$/.test(values.cardNumber)) {
            errors.cardNumber = 'Card number must be exactly 16 digits';
          }
          if (!values.expiryDate) {
            errors.expiryDate = 'Expiry date is required';
          }
          if (!/^\d{3}$/.test(values.cvv)) {
            errors.cvv = 'CVV must be exactly 3 digits';
          }
          if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setSubmitting(false);
            return;
          }

          // Simulate a form submission
          setTimeout(() => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Order Placed",
                showConfirmButton: false,
                timer: 1500
              });
            setSubmitting(false);
          }, 400);

          //adding orders to the data base 
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700 font-semibold mb-1">Card Number</label>
              <Field
                type="text"
                name="cardNumber"
                placeholder="Enter 16-digit card number"
                className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage name="cardNumber" component="div" className="text-red-500 mt-1 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="expiryDate" className="block text-gray-700 font-semibold mb-1">Expiry Date</label>
              <Field
                type="date"
                name="expiryDate"
                className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage name="expiryDate" component="div" className="text-red-500 mt-1 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="cvv" className="block text-gray-700 font-semibold mb-1">CVV</label>
              <Field
                type="text"
                name="cvv"
                placeholder="CVV"
                className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage name="cvv" component="div" className="text-red-500 mt-1 text-sm" />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-all duration-300"
              disabled={isSubmitting}
              onClick={()=>handleAddToOrders(cart)}
            >
              Pay Now
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PayForm;
