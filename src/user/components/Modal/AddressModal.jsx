import React, { useState } from "react";

const AddressModal = ({isOpen, onClose, onCheckout}) => {
  const [address, setAddress] = useState("");

    if(!isOpen) return null


  const handleCheckout = () => {
    if (!address.trim()) {
      alert("Please enter an address");
      return;
    }
    onCheckout(address); // Pass the address to the parent component
    setAddress(""); // Reset the address field
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-lg font-semibold mb-4">Enter Delivery Address</h2>
        <textarea
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Enter your address here..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
