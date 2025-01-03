import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { context_page } from '../../user/context/ContextProduct';
import axios from 'axios';
import ConfirmModal from '../../user/components/confirmationModal/ConfirmModal';
import toast from 'react-hot-toast';

const UserInfo = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [modalOpen, setModalOpen] = useState(false)
    
    const { users ,blockAndUnblockUser, fetchUsers ,setUsers , handleRemoveUser} = useContext(context_page);
    const [cartProducts , setCartProducts] = useState([])
    // const [isBlocked,setIsBlocked] = useState(false)

    const currentUser = users.find((user) => String(user._id) === String(id));

    if (!currentUser) {
        return <div className="text-center text-red-600">User not found</div>;
    }
    console.log(currentUser)

    
    
    const isBlocked =  currentUser.isBlocked

    const handleUserStatus = (userid) => {
      blockAndUnblockUser(userid)
        .then(() => {
          const updatedUsers = users.map((user) =>
            user._id === userid ? { ...user, isBlocked: !user.isBlocked } : user
          );
          toast("user status updated")
        })
        .finally(() => {
          fetchUsers(); 
        });
    };
    const deleteUser = () => {
      handleRemoveUser(currentUser._id)
      fetchUsers()
      navigate(-1)
    }

    

    const handleModalOpen = () =>{
      setModalOpen(true)
      console.log("modal open" ,modalOpen);
      
    }

    const modalClose = () => {
      setModalOpen(false)
    }



    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100 ">
  <div className="mx-20 bg-white p-10 shadow-2xl rounded-2xl max-w-3xl w-full ">
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
        <h1 className="text-2xl font-bold text-gray-700">Name: {currentUser.name}</h1>
        <h1 className="text-lg font-medium text-gray-600">Email: {currentUser.email}</h1>
        <div className='flex gap-3 '>
        <button 
        onClick={()=>handleUserStatus(currentUser._id)} 
        className={`px-2  text-white  ${!isBlocked ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-700"}`}>{isBlocked ? "UNBLOCK" : "BLOCK"}</button>
        <button 
        onClick={handleModalOpen}
        className='px-2 bg-red-600 text-white hover:shadow-2xl  hover:bg-red-700'>DELETE</button>
        </div>
      </div>
    </div>
  </div>
  <ConfirmModal modalOpen={modalOpen} setModalOpen={setModalOpen} deleteUser={deleteUser}/>
</div>

    )
}

export default UserInfo;
