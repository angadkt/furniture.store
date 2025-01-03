import React, { useContext } from "react";
import { context_page } from "../../context/ContextProduct";

const ConfirmModal = ({ modalOpen, setModalOpen,deleteUser, id }) => {
  // if (!modalOpen) return null;
  const {handleRemoveUser} = useContext(context_page)

  const onClose = ()=> {
    setModalOpen(false)
  }
  
  console.log("modal page", modalOpen)
  return (
    modalOpen?(<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={deleteUser}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>) : null
  );
};

export default ConfirmModal;
