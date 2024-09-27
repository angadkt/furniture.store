import React, { useEffect, useState } from 'react'

const AdminProducts = () => {
    const [productPage , setProductPage] = useState(()=>{
        return localStorage.getItem('productPage')
    })

    useEffect(()=>{
        localStorage.setItem('productPage' , productPage)
    },[productPage])


    const handleOnPageChange = (str)=>{
        setProductPage(str)
    }


  return (
    <>
      <div className='bg-green-300'>
        <h1 className='ml-10 pt-5'>Product Details.</h1>
      </div>
        <div className='bg-red-400 h-full w-full'>
                <div className=' flex flex-wrap justify-evenly'>
                    <button className='focus:border'>ADD PRODUCT</button>
                    <button className='focus:border'>VIEW PRODUCT</button>
                </div>
                {
                    (productPage === "addproduct") ? 
                    <>
                    add product
                    </>
                    :
                    (productPage === "viewproduct") &&
                    <>
                    view product
                    </>
                }
        </div>
    </>
  )
}

export default AdminProducts
