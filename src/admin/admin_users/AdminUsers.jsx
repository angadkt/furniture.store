import React from 'react'
import { useContext } from 'react'
import { context_page } from '../../user/context/ContextProduct'
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const AdminUsers = () => {
    const {users} = useContext(context_page);
    const navigate = useNavigate()

  return (
    <>
      <div>
        <h1 className='ml-10 pt-5 text-cutomBlueAdmin font-bold text-2xl'>User Panel.</h1>
      </div>
      <div className='flex  justify-center  mx-20 h-full mt-10'>  
      <table class="min-w-full bg-white border border-gray-300 shadow-lg ">
  <thead>
    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
      <th class="py-3 px-6 text-left">User Id</th>
      <th class="py-3 px-6 text-left">Name</th>
      <th class="py-3 px-6 text-left">Email</th>
      <th class="py-3 px-6 text-center">View More</th>
    </tr>
  </thead>
  <tbody class="text-gray-600 text-sm font-light">
    {
      users.map((item) => (
        <tr key={item.id} class="border-b border-gray-200 hover:bg-gray-100">
          <td class="py-3 px-6 text-left whitespace-nowrap">{item.id}</td>
          <td class="py-3 px-6 text-left">{item.username}</td>
          <td class="py-3 px-6 text-left">{item.email}</td>
          <td class="py-3 px-6 text-center">
            <button 
            onClick={()=>navigate(`/UserInfo/${item.id}`)}
            class="bg-blue-500 text-white px-4 py-2 rounded   hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
              View More
            </button>
          </td>
        </tr>
      ))
    }
  </tbody>
</table>

      </div>
    </>
  )
}

export default AdminUsers
