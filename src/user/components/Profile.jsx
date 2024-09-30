import React, { useState } from 'react';




const Profile = () => {
  const nameOfUser = localStorage.getItem('username');
  const emailOfUser = localStorage.getItem('email');

  return (
    <div className='mt-20'>
      {/* <Navbar /> */}
      {/* <div className='flex justify-center'>
        <div className='w-3/4 h-60 bg-gray-200 rounded-md p-10'>
          <h1 className='text-2xl font-bold'>Welcome, {nameOfUser}!</h1>
          <p>Your email: {emailOfUser}</p>
        </div>
      </div> */}

      {/* <div className='flex justify-center'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
          Edit Profile
        </button>
      </div> */}

      {/* <div className='flex justify-center mt-4'>
        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
          Logout
        </button>
      </div> */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">{nameOfUser}</h2>
            <p className="mb-6">{emailOfUser}</p>

            {/* Buttons in the modal */}
            <div className="flex justify-end space-x-4">
              <button 
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={toggleModal}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
