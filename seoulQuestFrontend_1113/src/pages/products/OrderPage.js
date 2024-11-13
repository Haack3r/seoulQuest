import React from 'react'

import { useParams } from 'react-router-dom'
import OrderComponent from '../../components/products/OrderComponent'

const OrderPage = () => {

   

  return (
    <div className='p-4 w-full bg-gray-100'>
        <OrderComponent />
    </div>
  )
}

export default OrderPage