import React from 'react'
import Navbar from '../components/Navbar'
import { useContext } from 'react'
import { context_page } from '../context/ContextProduct'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

const AllProducts = () => {

  const navigate = useNavigate()
  const { products, handleAddToCart } = useContext(context_page)
  // const {handleAddToCart} = useContext(context_page)


  return (
    <div >
    {/* <Navbar /> */}
    <SearchBar/>
    <div className='w-full h-full   md:px-16 px-8 mt-5'>
      <h1 className='mb-14 text-5xl'><center>All Products</center></h1>
  <div className='flex justify-center flex-wrap gap-6'>
    {products.map((item) => (
      <div 
        className=' flex flex-col items-center rounded-xl  w-full sm:w-1/3 md:w-1/4 lg:w-1/5 py-6 shadow-2xl'
        // onClick={()=>navigate(`/products/${item.id}`)} 
        key={item.id}
      >
        <img className='w-48 h-48 object-cover rounded-xl' src={item.image} alt={item.name} />
        <div className='w-full  flex flex-col  items-start ml-10'>
        <h1 className='mt-4 text-lg font-medium overflow-hidden'>{item.name}</h1>
        <h1 className='mt-2 text-xl font-semibold text-red-500'>{item.price}</h1>
        <div className='flex justify-between w-full' >
        <button
        onClick={()=>handleAddToCart(item)}
         className=' p-1 rounded-md px-2 mt-2 bg-blue-500 text-white hover:bg-blue-600'>Add to Cart</button>
        <button
        onClick={()=>navigate(`/products/${item.id}`)}
         className=' p-1 rounded-md px-2 mt-2 bg-blue-500 text-white hover:bg-blue-600 mr-10'>View Details</button>
        </div>
        </div>
      </div>
    ))}
  </div>
</div>

    
      
  
    {/* </div> */}
    {/* <div className='h-screen bg-blue-600 w-full mt-20'><h1>Products</h1></div> */}
    </div>
  )
}

export default AllProducts
