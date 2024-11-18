import React from 'react'
import { useParams } from 'react-router-dom'
import ReadComponent from '../../components/productsReview/ReadComponent';

const productReviewReadPage = () => {
    // const {tno} = useParams()
    
  return (
    <div className='font-extrabold w-full bg-white mt-6'>
      <div className='text-2xl'>
        product review Read Page
      </div>     
      <ReadComponent 
      // tno={tno}
      ></ReadComponent>
    </div>
  )
}

export default productReviewReadPage;