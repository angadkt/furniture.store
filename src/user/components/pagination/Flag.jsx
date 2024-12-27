import React from "react";

const Flag = ({ totalItems, itemsPerPage, setCurrentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-5">
      {pages.map((page, index) => (
        <>
          <button key={index}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white transition duration-300"
            onClick={() => setCurrentPage(page)}
            
          >
            {page}
          </button>
        </>
      ))}
    </div>
  );
};

export default Flag;
