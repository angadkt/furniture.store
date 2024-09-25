import React from 'react'

const PaymentPage = () => {
  return (
    <div className='mt-20 h-screen'>
      <div className='flex justify-center w-full mb-10'>
        <h1>Shipping / Billing Address</h1>
      </div>
        <div>
            <form className='flex flex-col justify-center items-center gap-6'>
                <input className='border border-black px-5 py-2 rounded-lg shadow-2xl' 
                 type="text" name="" id="" placeholder='Full Name' />
                <input className='border border-black px-5 py-2 rounded-lg shadow-2xl'
                 type="email" name="" id="" placeholder='Email' />
                <input className='border border-black px-5 py-2 rounded-lg shadow-2xl'
                 type="number" name="" id="" placeholder='Mobile Number' />
                <input className='border border-black px-5 py-2 rounded-lg shadow-2xl'
                type="text" name="" id="" placeholder='Street Address' />
                <input className='border border-black px-5 py-2 rounded-lg shadow-2xl'
                 type="number" name="" id="" placeholder='Pincode' />
                <input className='border border-black px-5 py-2 rounded-lg shadow-2xl'
                 type="text" name="" id="" placeholder='City' />
                <input className='border border-black px-5 py-2 rounded-lg shadow-2xl'
                 type="text" name="" id="" placeholder='state' />
                <input className='border border-black px-5 py-2 rounded-lg shadow-2xl'
                 type="text" name="" id="" placeholder='Country' />
                <input className='border border-black px-5 py-2 rounded-lg shadow-2xl'
                 type="text" name="" id="" placeholder='Full Name' />
                <button className='bg-blue-500 text-white px-8 rounded-md py-2 text-bold hover:bg-blue-700' type='submit'>Order</button>
            </form>
        </div>
    </div>
  )
}

export default PaymentPage
