import React from 'react';
import Navbar from './Navbar';

const Profile = () => {
  const nameOfUser = localStorage.getItem('username');
  const emailOfUser = localStorage.getItem('email');

  return (
    <div className='mt-20'>
      {/* <Navbar /> */}
      <div className='flex justify-center'>
        <div className='w-3/4 h-60 bg-gray-200 rounded-md p-10'>
          <h1 className='text-2xl font-bold'>Welcome, {nameOfUser}!</h1>
          <p>Your email: {emailOfUser}</p>
        </div>
      </div>

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
    </div>
  );
};

export default Profile;
