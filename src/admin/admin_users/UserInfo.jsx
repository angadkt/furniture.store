import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { context_page } from '../../user/context/ContextProduct';

const UserInfo = () => {
    const { id } = useParams();
    const { users, handleDeleteUser, active, handleUserStatus } = useContext(context_page);

    const currentUser = users.find((user) => String(user.id) === String(id));

    if (!currentUser) {
        return <div className="text-center text-red-600">User not found</div>;
    }
    console.log(currentUser)

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
  <div className="mx-20 bg-white p-10 shadow-2xl rounded-2xl max-w-3xl w-full">
    {/* Profile Section */}
    <div className="text-center mb-8">
      <h1 className="text-4xl font-extrabold text-gray-800">Profile</h1>
    </div>
    <div className="flex items-center justify-center space-x-8 mb-10">
      <img
        className="w-40 h-40 rounded-full border-4 border-blue-500"
        src={"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
        alt="Profile"
      />
      <div>
        <h1 className="text-2xl font-bold text-gray-700">Name: {currentUser.username}</h1>
        <h1 className="text-lg font-medium text-gray-600">Email: {currentUser.email}</h1>
        <div className='flex gap-3 '>
        <button 
        onClick={()=>handleUserStatus(currentUser)} 
        className={`px-2  text-white  ${active? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-700"}`}>{active? "BLOCK" : "UNBLOCK"}</button>
        <button 
        onClick={()=>handleDeleteUser(currentUser)}
        className='px-2 bg-red-600 text-white hover:shadow-2xl  hover:bg-red-700'>DELETE</button>
        </div>
      </div>
    </div>

    {/* Cart Section */}
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 pb-2 border-gray-200">User Cart</h2>
      {/* {currentUser.length > 0 ? 
        currentUser.cart.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition-all flex items-center gap-4 mb-4"
          >
            <img
              className="w-20 h-20 rounded-md border border-gray-300"
              src={item.image}
              alt={item.name}
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Product: {item.name}</h3>
              <p className="text-sm text-gray-500">MRP (per product): {item.price}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))
      : (
        <p className="text-center text-gray-500">No items in cart</p>
      )} */}
      {
        currentUser.cart.length > 0 ? 
        currentUser.cart.map((item,index)=>{
          return (
            <>
            <div key={item.index}>
            <div
            key={item.id}
            className="p-4 rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition-all flex items-center gap-4 mb-4"
          >
            <img
              className="w-20 h-20 rounded-md border border-gray-300"
              src={item.image}
              alt={item.name}
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Product: {item.name}</h3>
              <p className="text-sm text-gray-500">MRP (per product): {item.price}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
          </div>
            </div>
            </>
          )
        })
         :
         <>
         <p>product not found</p>
         </>
      }
    </div>
  </div>
</div>

    )
}

export default UserInfo;
