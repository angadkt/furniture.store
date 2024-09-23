import React, { useContext, useEffect, useState } from 'react'
import { context_page } from '../context/ContextProduct'
import axios from 'axios'

const CartView = () => {
    const {cart , setCart} = useContext(context_page)
    // const [cartData , setCartData] = useState([])
    
    const iD = localStorage.getItem('id');

    useEffect(()=>{
        if(!iD){
            alert('please login first');
        }else{
            axios.get(`http://localhost:5999/users/${iD}`)
            .then((res)=> (
                setCart(res.data.cart)
            ))
        }
    },[])

    const total = cart.reduce((acc, element)=> acc+(element.price * element.quantity),0)

    if(!cart){
        return(
            <div className='flex justify-center items-center'>
                Loading...........................
            </div>
        )
    }

    // const handlecart = ()=>{
    //     if(!cart){
    //       alert("your cart is empty")
    //     }
    //     else{
    //       navigate("/checkout")
    //     }
    //   }

  return (
    <div className='mt-20 flex flex-col flex-wrap gap-5'>
        
      {
        cart.map((item)=>(
            <div key={item.id}
            className='border border-black mx-20 p-4 rounded-xl shadow-xl'
            >
                <div>
                <img
                className='w-20 h-20'
                src={item.image}
                 alt={item.name} />
                </div>
                <h1>{item.name}</h1>
                <h1>{item.price}</h1>
            </div>
        ))
        // console.log(cart)
        
      }

      <div className='flex justify-between items-center mt-10'>
        <h1>Total Price : {total}</h1>
        <button onClick={handlecart} className='p-1 rounded-md px-2 bg-blue-500 text-white hover:bg-blue-600'>Checkout</button>
      </div>
    </div>
  )
}

export default CartView
