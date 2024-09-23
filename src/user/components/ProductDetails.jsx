import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { context_page } from '../context/ContextProduct';

const ProductDetails = () => {
    const {id} = useParams();
    const {products} = useContext(context_page);
    const productDetail = products.filter((item) => parseInt(item.id) === parseInt(id));
  return (
    <div>
      <div className='mt-20 flex justify-center items-center'>
        {
            productDetail.map((item) =>(
                <div className='border border-black w-3/4 mt-10 p-5 rounded-xl'>
                <img className='w-[400px]' src={item.image} alt={item.name} />
                <div>{item.category}</div>
                <div>{item.details}</div>
                <div>{item.price}</div>
                {console.log('mapped')}
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default ProductDetails
