import React from 'react'
import Navbar from '../components/Navbar'
import { useContext } from 'react'
import { context_page } from '../context/ContextProduct'

const AllProducts = () => {

  const { products } = useContext(context_page)

  return (
    <div >
    <Navbar />
    <div className=' w-full h-4 bg-blue-600'></div>
    <div className=' w-full h-4 bg-blue-600 mt-10'></div>
    {/* <div className='w-full h-20 bg-slate-400 mt-10'> */}
      
      {/* <div className='w-full  flex justify-center mt-40'>
        {
          products.map((item)=>(
            <div key={item.id}>
                <img src={item.image} alt={item.name} />
                <h1>{item.name}</h1>
            </div>
          ))
        }
      </div> */}

    {/* </div> */}
    {/* <div className='h-screen bg-blue-600 w-full mt-20'><h1>Products</h1></div> */}



    
    </div>
  )
}

export default AllProducts
