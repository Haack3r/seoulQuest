import React from 'react'

import { useParams } from 'react-router-dom'
import OrderComponent from '../../components/products/OrderComponent'

const OrderPage = () => {

    const {pno} = useParams()

  return (
    <div className='p-4 w-full bg-gray-100'>
        <OrderComponent pno={pno}></OrderComponent>
    </div>
  )
}

export default OrderPage